//=====
// Replace Code From StackExchange
//=====

// This component handles all the post creation functionality, with some conditionals set up to determine where
import { useState } from 'react'
import { ref, push } from 'firebase/database';
import database from './firebase';
import CreateInput from './CreateInput';

const CreateNewBlog = function(props){

    const { currentBlog, newPostHeaderTop, newPostHeaderBot, postBlogButtonText } = props;

    const [userInputBlog, setUserInputBlog] = useState("");
    const [userInputTitle, setUserInputTitle] = useState("");
    const [userInputContent, setUserInputContent] = useState("");
    const [showCompleteBlog, setShowCompleteBlog] = useState(false);

    // Checks weather we are creating a new plog, or appending to an existing blog post.  I'm sure there's a better way to do this, but it's servicable for the time being.  This conditional lets the code either render as the "new blog" or "new post"

    // Also sets a variable to either the blog title or an empty string to an empty string for later reference.  Bad catch, but it works.  

    let enableNewBlog = false;
    let blogTitle = currentBlog;
    if (currentBlog === "newblog"){
        enableNewBlog = true;
        blogTitle = "";
    }

    // gets and stores input, so it can re-render input.
    const handleChangeBlogTitle = function(event){
        setUserInputBlog(event.target.value);
    }
    const handleChangePostTitle = function(event){
        setUserInputTitle(event.target.value);
    }
    const handleChangePostContent = function(event){
        setUserInputContent(event.target.value);
    }

    // database push function, 

    const handleSubmitPostTitle = function(event){
        event.preventDefault();

        //the gross giant conditional basically says "if the blog is disabled, you only need the two inputs, otherwise you need all 3"
        if (((enableNewBlog === false) && userInputTitle && userInputContent) || (userInputBlog && userInputTitle && userInputContent)){
            let childNodeRef;
            if (enableNewBlog){
                childNodeRef = ref(database, userInputBlog);
            }
            else{
                childNodeRef = ref(database, currentBlog);
            }

            // builds a usable timestamp
            const timestamp = new Date().toLocaleDateString("en-US", {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric'
            });

            // once we submit, it resets the inputs and also disables the inputs, which is checked in a ternary below
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
                <h2>{ newPostHeaderTop }</h2>
                <h3>{ newPostHeaderBot }{ blogTitle }</h3>
                <form onSubmit={ handleSubmitPostTitle } className="createBlogForm">
                    {
                        enableNewBlog === true
                        ?
                        <CreateInput 
                        type={ "text" } 
                        id={ "id1" } 
                        onChange ={ handleChangeBlogTitle } 
                        value={ userInputBlog.replace(/[^a-zA-Z0-9 ]/g, "") } 
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
                    <button>{ postBlogButtonText }</button>
                </form>
            </div>
        :
            <> 
                <h2>Post Made!</h2>
                <button 
                    onClick={ () => setShowCompleteBlog(false) }>Make Another Post?</button>
            </> 
        }
        </>
    )
}

export default CreateNewBlog
