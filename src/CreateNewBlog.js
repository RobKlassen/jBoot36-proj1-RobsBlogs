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
            push(childNodeRef, {title: userInputTitle, content: userInputContent});
            setUserInputTitle("");
            setUserInputBlog("");
            setUserInputContent("");
        }
        else{
            alert("Please fill out all inputs");
        }
    }

    return(
        <div className="blogCreateMainContent">
            <h2>Hi, you've entered the world of blog creation</h2>
            <form onSubmit={ handleSubmitPostTitle }>
                <CreateInput type={ "text" } id={ "id1" } onChange ={ handleChangeBlogTitle } value={ userInputBlog } />
                <CreateInput type={ "text" } id={ "id2" } onChange ={ handleChangePostTitle } value={ userInputTitle } />
                <CreateInput type={ "text" } id={ "id3" } onChange ={ handleChangePostContent } value={ userInputContent } />
                <button>feed data to database</button>
            </form>
        </div>
    )
}

export default CreateNewBlog


