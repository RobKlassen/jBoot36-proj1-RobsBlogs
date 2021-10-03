import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import database from './firebase';
import GetSection from './GetSection';
import GetBlogPosts from './GetBlogPosts';

function App() {
    
    const [userInput, setUserInput] = useState("");
    
    const [showSection, setShowSection] = useState(false);
    const [showMain, setShowMain] = useState(true);
    const [targetSection, setTargetSection] = useState(null);

    const [sectionList, setSectionList] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);


    useEffect(function(){
        const dbRef = ref(database);
   
        onValue(dbRef, function(dbCurrent){
            const myData = dbCurrent.val();
            const dataObjectArray = [];

            for (let dbSection in myData){
                const dataObject = {
                    key: dbSection,
                    name: dbSection,
                    section: myData[dbSection]
                }
                dataObjectArray.push(dataObject);
            }
            setSectionList(dataObjectArray);
        });
    },[]);


    const handleSubmit = function(event){
        event.preventDefault();
    }
    const handleChange = function(event){
        setUserInput(event.target.value);
    }

    const turnObjectIntoArray = function(object){
        console.log("function", object);
        const toArray = [];
        for (let item in object){
            toArray.push(item);
        }
        return toArray;
    }

    return (
        <div className="App">
            <header>
                <div className="wrapper">
                    <h1>Robs Blogss</h1>
                </div>
            </header>
            
            <main>
                <div className="mainWrapper">

                    <div className="contentDisplay">
                        <ul> 
                            {
                                showSection === true ?
                                <GetBlogPosts section={ targetSection }/> :
                                null
                            }
                        </ul>
                    </div>

                    <div className="navButtons">
                        <ul>
                            {
                            showMain === true ?
                                sectionList.map(function(siteSection, index){
                                    return(
                                        <div className="">
                                            {/* <GetSection key={ siteSection.key } section={ siteSection.name }/> */}

                                            <button onClick={ function(){
                                                setTargetSection(siteSection.name)                                 
                                                setShowSection(!showSection)
                                                setShowMain(false)
                                            }
                                            }>show {siteSection.name} entries</button> 
                                        </div>
                                    )
                                }) 
                            :

                            // null
                                <button onClick={function(){
                                    setShowMain(true)
                                    setShowSection(false)
                                }
                            }>Return to Main</button>

                            }
                        </ul>
                    </div>


                </div>
            </main>
            <footer>
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
                <p>Coded by Rob</p>
            </footer>
        </div>
    );
}

export default App;



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





