import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import database from './firebase';

function App() {
    
    const [userInput, setUserInput] = useState("");
    const [sectionList, setSectionList] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);


    useEffect(function(){
        const dbRef = ref(database);
   
        onValue(dbRef, function(dbCurrent){
            const myData = dbCurrent.val();

            const dataObjectArray = [];
            const dataBlogPostArray = [];

            for (let dbSection in myData){
                const dataObject = {
                    key: dbSection,
                    section: myData[dbSection]
                }
                dataObjectArray.push(dataObject);
            }
            setSectionList(dataObjectArray);

            for (let dbBlogPosts in myData.blogs){
                const dataObject = {
                    key: dbBlogPosts,
                    title: myData.blogs[dbBlogPosts].title,
                    content: myData.blogs[dbBlogPosts].content
                }
                dataBlogPostArray.push(dataObject);
            }
            setBlogPosts(dataBlogPostArray);

            
 
        });

    },[]);
    // console.log("section list", sectionList);
    console.log("blog posts", blogPosts.title);



    const handleSubmit = function(event){
        event.preventDefault();
        // db push
    }

    const handleChange = function(event){
        setUserInput(event.target.value);
    }

    const turnObjectIntoArray = function(object){
        const toArray = [];
        for (let item in object){
            toArray.push(item);
        }
        return toArray;
    }



    return (
        <div className="App">
            <header>
                <h1>Robs Blogss</h1>
                <ul>
                    {
                        sectionList.map(function(siteSection){
                            return(
                                <li key={siteSection.key}>
                                    <p>{siteSection.key}</p>

                                    {/* <p>{turnObjectIntoArray(siteSection.section)}</p> */}
                                    {/* <p>{turnObjectIntoArray(siteSection.section.post1)}</p> */}
                                      {/* <p>{(siteSection.section.post1.title)}</p> */}
                                    {/* <p>{turnObjectIntoArray(siteSection.section[post1])}</p> */}
                                    {/* <p>{section}</p>     */}
                                </li>
                            )
                        })
                    }
                    {
                        blogPosts.map(function(blogpost){
                            return(
                                <li key={blogpost.key}>
                                    <p>{blogpost.key}</p>
                                    <p>{blogpost.title}</p>
                                    <p>{blogpost.content}</p>
                                </li>    
                            )
                        })
                    }
                </ul>
                <button>get some data from firebase</button>

                <form action="">
                    {/* write content to firebase */}
                    <label htmlFor="">Post Title</label>
                    <input 
                        type="text" 
                        id="blogpostTitle"
                        onChange={ handleChange }
                        value={ userInput }
                    />
                    <label htmlFor="">Post Content</label>
                    <input type="text" 
                        type="text" 
                        id="blogpostText"
                        onChange={ handleChange }
                        value={ userInput }
                    />
                    <button>Push some data to firebase</button>
                </form>
            </header>
        </div>
    );
}

export default App;



//  DECOMPILING DATA INTO SERIES OF NESTED ARRAYS

// useEffect(function(){
//     const dbRef = ref(database);
//     const blogSections = [];
    
//     onValue(dbRef, function(dbCurrent){
//         const myData = dbCurrent.val();
        
//         for (let dbSection in myData){
//             const blogPosts = [];
            
//             for (let dbPosts in myData[dbSection]){
//                 const postInfo = [];
                
//                 for (let dbParent in myData[dbSection][dbPosts]){
//                     postInfo.push(myData[dbSection][dbPosts][dbParent]);
//                 }
//                 blogPosts.push(postInfo);
//             }
//             blogSections.push(blogPosts);
//         }
//         console.log(blogSections);
//         console.log(blogSections[0]);
//         console.log(blogSections[0][0]);
//     })
// },[]);




// import { useState, useEffect } from 'react';
// import realtime from './firebase';
// import { ref, onValue, push } from 'firebase/database';
// import './App.css';
// // import { firebase/database } from 'firebase';


// function App() {
//     const [bookList, setBookList] = useState([]);
//     const [userInput, setUserInput] = useState("");
    
//     useEffect( ()=> {
//         const dbRef = ref(realtime);
        
//         onValue(dbRef, function(snapshot){
//             const myData = snapshot.val();
//             const newArray = [];
            
//             for (let propertyName in myData){
//                 const bookObject = {
//                     key: propertyName,
//                     title: myData[propertyName]
//                 }
//                 newArray.push(bookObject);
//             }
//             setBookList(newArray);
//         });
//     },[]);

//     const handleChange = function(event){
//         setUserInput(event.target.value);
//     }

//     const handleSubmit = function(event){
//         event.preventDefault();
//         if (userInput){
//             const dbRef = ref(realtime);
//             push(dbRef, userInput);
//             setUserInput("");
//         }
//         else{
//             alert("I AM HUNGER SATIATE ME")
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>Readin'</h1>

//             <form onSubmit={ handleSubmit }>
//                 <label htmlFor="userBookChoice">add thy book ye fool </label>
//                 <input 
//                     type="text" 
//                     id="userBookChoice"
//                     onChange={ handleChange }
//                     value={ userInput }
//                     />
//                 <button>feed data to database</button>
//             </form>

//             <ul>
//                 {
//                     bookList.map(function(individualBook){
//                         return (
//                         <li key={individualBook.key}>
//                             <p>{individualBook.title}</p>
//                         </li>
//                         )
//                     })
//                 }
//             </ul>
//         </div>
//     );
// }

// export default App;





