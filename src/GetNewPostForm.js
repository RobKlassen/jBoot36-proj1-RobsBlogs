import { useState, useEffect } from 'react'
import { ref, onValue, push, set } from 'firebase/database';
import database from './firebase';
import CreateInput from './CreateInput';

const GetNewPostForm = function(props){
        
    const { currentBlog } = props;

    // const [userInputBlog, setUserInputBlog] = useState("");
    const [userInputTitle, setUserInputTitle] = useState("");
    const [userInputContent, setUserInputContent] = useState("");

    // const handleChangeBlogTitle = function(event){
    //     setUserInputBlog(event.target.value);
    // }

    const handleChangePostTitle = function(event){
        setUserInputTitle(event.target.value);
    }

    const handleChangePostContent = function(event){
        setUserInputContent(event.target.value);
    }

    const handleSubmitPostTitle = function(event){
        event.preventDefault();
        if (userInputTitle && userInputContent){
            const childNodeRef = ref(database, currentBlog);
            push(childNodeRef, {title: userInputTitle, content: userInputContent});
            // setUserInputBlog("");
            setUserInputTitle("");
            setUserInputContent("");
        }
        else{
            alert("Please fill out all inputs");
        }
    }

    
    
    return(
        <form onSubmit={ handleSubmitPostTitle }>
            <CreateInput type={ "text" } id={ "id2" } onChange ={ handleChangePostTitle } value={ userInputTitle } />
            <CreateInput type={ "text" } id={ "id3" } onChange ={ handleChangePostContent } value={ userInputContent } />
            <button>Push some data to firebase</button>
        </form>
    )
}

export default GetNewPostForm