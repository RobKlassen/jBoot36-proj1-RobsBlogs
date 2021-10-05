import { useState } from 'react'
import { ref, push } from 'firebase/database';
import database from './firebase';
import CreateInput from './CreateInput';

const CreateNewBlog = function(props){
    const { currentBlog } = props;
    const [userInputBlog, setUserInputBlog] = useState("");
    const [userInputTitle, setUserInputTitle] = useState("");
    const [userInputContent, setUserInputContent] = useState("");
    const [showCompleteBlog, setShowCompleteBlog] = useState(false);
    let enableNewBlog = false;
    if (currentBlog === "newblog"){
        enableNewBlog = true
    }

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

        if (((enableNewBlog === false) && userInputTitle && userInputContent) || (userInputBlog && userInputTitle && userInputContent)){
            let childNodeRef;
            if (enableNewBlog){
                childNodeRef = ref(database, userInputBlog);
            }
            else{
                childNodeRef = ref(database, currentBlog);
            }
            const timestamp = new Date().toLocaleDateString("en-US", {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric'
            });
            push(childNodeRef, {title: userInputTitle, content: userInputContent, timestamp: timestamp});
            setUserInputTitle("");
            setUserInputBlog("");
            setUserInputContent("");
            setShowCompleteBlog(true);
        }
        else{
            alert("Please fill out all inputs");
        }
    }

    return(
        <>
        
        {        
        showCompleteBlog === false 
        ?
            <div className="blogCreateContainer">
                <h2>Create a new Blog!</h2>
                <h3>And don't forget to create your first entry!</h3>
                <form onSubmit={ handleSubmitPostTitle } className="createBlogForm">
                    {
                        enableNewBlog === true
                        ?
                        <CreateInput 
                        type={ "text" } 
                        id={ "id1" } 
                        onChange ={ handleChangeBlogTitle } 
                        value={ userInputBlog } 
                        groupClass={"blogTitleGroup"} 
                        groupClassLabel={"blogTitleLabel"} 
                        groupClassInput={"blogTitleInput"} 
                        labelText={"Blog Title: "}/>
                        :
                        null
                    }
                   
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
        :
            <> 
                <h1>Post Made!</h1>
                <button 
                    onClick={ () => setShowCompleteBlog(false) }>Make Another Post?</button>
            </> 
        }
        </>
    )
}

export default CreateNewBlog
