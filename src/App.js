import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './firebase';
// import GetSection from './GetSection';
import GetBlogPosts from './GetBlogPosts';
import Header from './Header';
import Footer from './Footer';
import CreateNewBlog from './CreateNewBlog';
// import GetNewPostForm from './GetNewPostForm';

function App() {
   
    const [showSection, setShowSection] = useState(false);
    const [showCreateBlog, setShowCreateBlog] = useState(false);
    const [showMain, setShowMain] = useState(true);

    const [targetSection, setTargetSection] = useState(null);

    const [sectionList, setSectionList] = useState([]);
    // const [blogPosts, setBlogPosts] = useState([]);

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

    const visibilityManager = function(mainSectionVisible, postSectionVisible, createBlogSectionVisible){
        setShowMain(mainSectionVisible)
        setShowSection(postSectionVisible)
        setShowCreateBlog(createBlogSectionVisible)
    }

    return (
        <div className="App">
            <Header/>
            <main>
                <div className="mainWrapper">
                    <div className="contentDisplay">
                        <ul> 
                            {
                                showSection === true 
                                ?
                                <>
                                    <GetBlogPosts section={ targetSection }/>
                                    <CreateNewBlog currentBlog={ targetSection }/>

                                </>
                                : 
                                null
                            }
                            {
                                showCreateBlog === true 
                                ?
                                <CreateNewBlog currentBlog={ "newblog" }/>
                                : 
                                null
                            }
                        </ul>
                    </div>
                    <div className="navButtons">
                        <ul>
                            <button className="createNewBlogButton" onClick={ function() {
                                visibilityManager(false, false, true);
                            }
                            }>Create New Blog</button>
                            {
                                showMain === true 
                                ?
                                    sectionList.map(function(siteSection){
                                        return(
                                            <>
                                                <button onClick={ function(){
                                                    setTargetSection(siteSection.name)                                 
                                                    visibilityManager(false, true, false);
                                                }
                                                }>{siteSection.name}</button> 
                                            </>
                                        )
                                    }) 
                                :
                                <button onClick={function(){
                                    visibilityManager(true, false, false);
                                }
                                }>Return to Main</button>
                            }

                        </ul>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;



