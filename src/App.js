import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './firebase';
import GetBlogPosts from './GetBlogPosts';
import Header from './Header';
import Footer from './Footer';
import CreateNewBlog from './CreateNewBlog';
import MainText from './MainText';


function App() {
   
    const [showSection, setShowSection] = useState(false);
    const [showCreateBlog, setShowCreateBlog] = useState(false);
    const [showMain, setShowMain] = useState(true);
    const [showRandom, setShowRandom] = useState(false);
    const [targetSection, setTargetSection] = useState(null);
    const [sectionList, setSectionList] = useState([]);

    // access firebase to get a list of sections, ie, blog "parents"
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

    // there is a better way to do this, but in the interest of time I handled section visiblity this way. 
    // Each button that relates to a section calls this to appropriately render sections
    const visibilityManager = function(mainSectionVisible, postSectionVisible, createBlogSectionVisible, showRandomBlogVisible){
        setShowMain(mainSectionVisible);
        setShowSection(postSectionVisible);
        setShowCreateBlog(createBlogSectionVisible);
        setShowRandom(showRandomBlogVisible);
    }
    
    // sets the section to render to the one the button in the nav bar relates to
    const sectionSetter = function(target){
        setTargetSection(target);       
    }

    // gets a random blog from all the available blogs, called by the random blog button
    const getRandomBlog = function(){
        const randNum = Math.floor(Math.random()*sectionList.length);
        setTargetSection(sectionList[randNum].name);
    }



    return (
        <div className="App">
            <Header/>
            <main>
                <div className="mainWrapper">
                    <div className="contentDisplay">
                        {
                            // This whole chunk of code checks for "Visibility settings" and renders the appropriate components with the appropriate props
                            // the "else null" seems goofy to me, but it works. I'd normally want to set the else condition to "main" but this feels slightly more modular
                            showSection === true 
                            ?
                            <>
                                <GetBlogPosts section={ targetSection }/>
                                <CreateNewBlog currentBlog={ targetSection } newPostHeaderTop={"Make a new post!"} newPostHeaderBot={"It will be added to "} postBlogButtonText={"create new post!"} successPostText={"Make Another Post?"}/>
                            </>
                            : 
                            null
                        }
                        {
                            showCreateBlog === true 
                            ?
                            <CreateNewBlog currentBlog={ "newblog" } newPostHeaderTop={"Create a new Blog!"} newPostHeaderBot={"Make your first post"} postBlogButtonText={"create new blog!"} successPostText={"Create New Blog?"}/>
                            : 
                            null
                        }
                        {
                            showRandom === true
                            ?
                            <>
                            <GetBlogPosts section={ targetSection }/>
                            <CreateNewBlog currentBlog={ targetSection } newPostHeaderTop={"Make a new post!"} newPostHeaderBot={"It will be added to "} postBlogButtonText={"create new post!"} successPostText={"Cause more chaos?"}/>
                            </>
                            :
                            null
                        }
                        {
                            // Notes about main in the component
                            showMain === true
                            ?
                            <MainText/>
                            :
                            null
                        }
                    </div>
                    <nav className="navButtons">
                        <ul>
                            <button className="buttonReturnToMain" onClick={function(){ 
                                visibilityManager(true, false, false, false);
                            }}>Return to Main</button>

                            <button className="buttonViewRandom" onClick={function(){ 
                                visibilityManager(false, false, false, true);
                                getRandomBlog();
                            }}>View Random Blog</button>

                            <button className="buttonCreateNew" onClick={ function() {
                                visibilityManager(false, false, true, false);
                            }}>Create New Blog</button>

                            {
                                // I'm so annoyed about this 'key holder' div.  better planning would've solved it's inclusion.
                                // anyway this maps all the blogs into buttons, and when you click a button it pushes that blog's name to a component to render
                                // the appropriate blog content.
                                sectionList.map(function(siteSection, index){
                                    return(
                                        <div className="buttonKeyHolder" key={siteSection.key}>
                                            <button key={ index } onClick={ function(){
                                                sectionSetter(siteSection.name)                               
                                                visibilityManager(false, true, false, false);
                                            }}>{siteSection.name}</button> 
                                        </div>
                                    )
                                }) 
                            }
                        </ul>
                    </nav>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;


//TO DO
// 
// 4.   add fonts
// 6.   add image auth????
// 7.   add name????????










