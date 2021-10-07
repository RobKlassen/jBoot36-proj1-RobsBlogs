import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './firebase';
import GetBlogPosts from './GetBlogPosts';
import Header from './Header';
import Footer from './Footer';
import CreateNewBlog from './CreateNewBlog';


function App() {
   
    const [showSection, setShowSection] = useState(false);
    const [showCreateBlog, setShowCreateBlog] = useState(false);
    const [showMain, setShowMain] = useState(true);
    const [showRandom, setShowRandom] = useState(false);
    const [targetSection, setTargetSection] = useState(null);
    const [sectionList, setSectionList] = useState([]);

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

    const visibilityManager = function(mainSectionVisible, postSectionVisible, createBlogSectionVisible, showRandomBlogVisible){
        setShowMain(mainSectionVisible);
        setShowSection(postSectionVisible);
        setShowCreateBlog(createBlogSectionVisible);
        setShowRandom(showRandomBlogVisible);
    }
    
    const sectionSetter = function(target){
        setTargetSection(target);       
    }

    const getRandomBlog = function(){
        const randNum = Math.floor(Math.random()*sectionList.length);
        // console.log(sectionList[randNum]);
        setTargetSection(sectionList[randNum].name);
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
                                showMain === true
                                ?
                                <>
                                    <div className="blogPostContainer">

                                        <h3 className="blogPostHeader"> Welcome to Rob's Blogs</h3>
                                        <p className="blogPostTimestamp"> Made by Rob Klassen for Juno College of Technology, Project 3</p>

                                        <p className="mainContent">On the Nav Bar to the right you'll find a list of all the <span className="mainYellow">Blogs</span> people have created</p>
                                        <p className="mainContent">The <span className="mainGreen">Return to Main</span> button will bring you back here, but there's really nothing interesting to see on this page... </p>
                                        <p className="mainContent">What you probably want is to <span className="mainOrange">View a Random Blog</span> to see what chaos people have created or plagued my poor website with</p>
                                        <p className="mainContent">And if you want to add to the chaos, I would encourage you to <span className="mainRed">Create A New Blog</span>, be as goofy as you'd like</p>

                                    </div>
                                </>
                                :
                                null
                            }
                        </ul>
                    </div>
                    <div className="navButtons">
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
                                sectionList.map(function(siteSection, index){
                                    return(
                                        <>
                                            <button key={ index } onClick={ function(){
                                                sectionSetter(siteSection.name)                               
                                                visibilityManager(false, true, false, false);
                                            }}>{siteSection.name}</button> 
                                        </>
                                    )
                                }) 
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


//TO DO
// 

// 1.   add default content to main
// 1.4  add styling to main button
// 1.5  fix the key issue
// 2.   make create new blog send you to the main
// 3.   style create new blog success (also adds new post Text, unique)
// 4.   add fonts
// 5.   add nicer colours
// 6.   add image auth????
// 7.   add name????????










