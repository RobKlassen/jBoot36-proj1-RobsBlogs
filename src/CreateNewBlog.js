import { useState, useEffect } from 'react'
import { ref, onValue, push, set } from 'firebase/database';
import database from './firebase';
import CreateInput from './CreateInput';

const CreateNewBlog = function(){
    
    const [userInputBlog, setUserInputBlog] = useState("");
    const [userInputTitle, setUserInputTitle] = useState("");
    const [userInputContent, setUserInputContent] = useState("");

    const handleChangeBlogTitle = function(event){
        setUserInputBlog(event.target.value);
    }

    const handleChangePostTitle = function(event){
        setUserInputTitle(event.target.value);
    }

    const handleChangePostContent = function(event){
        setUserInputContent(event.target.value);
    }

    const handleSubmitPostTitle = function(event){
        event.preventDefault();
        if (userInputBlog && userInputTitle && userInputContent){
            const childNodeRef = ref(database, userInputBlog);
            const timestamp = new Date().toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
            push(childNodeRef, {title: userInputTitle, content: userInputContent, timestamp: timestamp});
            setUserInputTitle("");
            setUserInputBlog("");
            setUserInputContent("");
        }
        else{
            alert("Please fill out all inputs");
        }
    }

    return(
        <div className="blogCreateContainer">
            <h2>Create a new Blog!</h2>
            <h3>And don't forget to create your first entry!</h3>
            <form onSubmit={ handleSubmitPostTitle } className="createBlogForm">
                <CreateInput 
                    type={ "text" } 
                    id={ "id1" } 
                    onChange ={ handleChangeBlogTitle } 
                    value={ userInputBlog } 
                    groupClass={"blogTitleGroup"} 
                    groupClassLabel={"blogTitleLabel"} 
                    groupClassInput={"blogTitleInput"} 
                    labelText={"Blog Title: "}/>
                <div className="titleAndContentContainer">
                    <CreateInput 
                        type={ "text" } 
                        id={ "id2" } 
                        onChange ={ handleChangePostTitle } 
                        value={ userInputTitle } 
                        groupClass={"postTitleGroup"} 
                        groupClassLabel={"postTitleLabel"} 
                        groupClassInput={"postTitleInput"}
                        labelText={"Title of Blog Post: "} />

                    <CreateInput  
                        type={ "textarea" } 
                        id={ "id3" } 
                        onChange ={ handleChangePostContent } 
                        value={ userInputContent } 
                        groupClass={"postContentGroup"} 
                        groupClassLabel={"postContentLabel"} 
                        groupClassInput={"postContentInput"}
                        labelText={"Your Blog Entry: "} />
                </div>
                <button>create new blog</button>
            </form>
        </div>
    )
}

export default CreateNewBlog
