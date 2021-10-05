// import { useState } from 'react'
// import { ref, push } from 'firebase/database';
// import database from './firebase';
// import CreateInput from './CreateInput';

// const GetNewPostForm = function(props){
//     const { currentBlog } = props;

//     const [userInputTitle, setUserInputTitle] = useState("");
//     const [userInputContent, setUserInputContent] = useState("");
//     const [showCompleteBlog, setShowCompleteBlog] = useState(false);

//     const handleChangePostTitle = function(event){
//         setUserInputTitle(event.target.value);
//     }

//     const handleChangePostContent = function(event){
//         setUserInputContent(event.target.value);
//     }

//     const handleSubmitPostTitle = function(event){
//         event.preventDefault();
//         if (userInputTitle && userInputContent){
//             const childNodeRef = ref(database, currentBlog);
//             const timestamp = new Date().toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
//             push(childNodeRef, {title: userInputTitle, content: userInputContent, timestamp: timestamp});
//             setUserInputTitle("");
//             setUserInputContent("");
//             setShowCompleteBlog(true);
//         }
//         else{
//             alert("Please fill out all inputs");
//         }
//     }

//     return(
//         <>
//         {        
//             showCompleteBlog === false 
//             ?
//             <form onSubmit={ handleSubmitPostTitle }>
//                 <CreateInput type={ "text" } id={ "id2" } onChange ={ handleChangePostTitle } value={ userInputTitle } />
//                 <CreateInput type={ "text" } id={ "id3" } onChange ={ handleChangePostContent } value={ userInputContent } />
//                 <button>Push some data to firebase</button>
//             </form>
//             :
//             <> 
//             <h1>Post Made!</h1>
//             <button 
//                 onClick={ () => setShowCompleteBlog(false) }>Make Another Post?</button>
//             </> 
//         }
//         </>
//     )
// }

// export default GetNewPostForm

