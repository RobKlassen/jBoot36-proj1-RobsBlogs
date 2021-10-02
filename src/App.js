import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import database from './firebase';

function App() {
    
    const [userInput, setUserInput] = useState("");

    const [sectionList, setSectionList] = useState([]);


    useEffect(function(){
        const dbRef = ref(database);
        // const blogSections = [];
        
        onValue(dbRef, function(dbCurrent){
            const myData = dbCurrent.val();
            const dataObjectArray = [];

            for (let dbSection in myData){
                const dataObject = {
                    key: dbSection,
                    section: myData[dbSection]
                }
                dataObjectArray.push(dataObject);
            }
            setSectionList(dataObjectArray);
        })

    },[]);
    // console.log(sectionList);



    const handleSubmit = function(event){
        event.preventDefault();
        // db push
    }

    const handleChange = function(event){
        setUserInput(event.target.value);
    }



    console.log("hello world");

    return (
        <div className="App">
            <header>
                <h1>Robs Blog</h1>
                <ul>
                    {// get title data from firebase
                        //map elements
                            //get post from firebase title 
                                //map those elements
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





