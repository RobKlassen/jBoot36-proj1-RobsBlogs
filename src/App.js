import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import database from './firebase';
import GetSection from './GetSection';
import GetBlogPosts from './GetBlogPosts';
import Header from './Header';
import Footer from './Footer';
import CreateNewBlog from './CreateNewBlog';
import GetNewPostForm from './GetNewPostForm';

function App() {
   
    const [showSection, setShowSection] = useState(false);
    const [showCreateBlog, setShowCreateBlog] = useState(false);
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

    return (
        <div className="App">
            <Header/>
            <main>
                <div className="mainWrapper">

                    <div className="contentDisplay">
                        <ul> 
                            {
                                showSection === true ?
                                <>
                                    <GetBlogPosts section={ targetSection }/>
                                    <GetNewPostForm currentBlog={ targetSection }/>

                                </>
                                : null
                            }
                            {
                                showCreateBlog === true ?
                                <CreateNewBlog/>
                                : null
                            }
                        </ul>
                    </div>

                    <div className="navButtons">
                        <ul>
                            {
                                showMain === true 
                                ?
                                    sectionList.map(function(siteSection, index){
                                        return(
                                            <div className="">
                                                {/* <GetSection key={ siteSection.key } section={ siteSection.name }/> */}

                                                <button onClick={ function(){
                                                    setTargetSection(siteSection.name)                                 
                                                    setShowMain(false)
                                                    setShowSection(true)
                                                    setShowCreateBlog(false)
                                                }
                                                }>show {siteSection.name} entries</button> 
                                            </div>
                                        )
                                    }) 
                                :
                                <button onClick={function(){
                                    setShowMain(true)
                                    setShowSection(false)
                                    setShowCreateBlog(false)
                                }
                                }>Return to Main</button>
                            }
                            <button className="createNewBlogButton" onClick={ function() {
                                setShowMain(false)
                                setShowSection(false)
                                setShowCreateBlog(true)
                            }
                            }>Create New Blog</button>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;



