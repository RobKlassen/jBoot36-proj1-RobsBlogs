//This Component is actually rendering the blog posts in each blog

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './firebase';
import Buttonbox from './Buttonbox';

//There is absolutely a way to pass this functionality into the other firebase api call, but, it involves storing a potential truckload of information.  
//the way I made this, only the key is passed into this component (props.section) and because the key will be consistent, we can use it to access the database
//Again, messy to have a second api call, but in theory if there were a TON of blogs, we wouldn't need to store all the info
const GetBlogPosts = function(props){
    const [blogPosts, setBlogPosts] = useState([]);


    useEffect(()=>{return (() => {});},[]);

    useEffect(function(){
        const dbRef = ref(database);
   
        onValue(dbRef, function(dbCurrent){
            const myData = dbCurrent.val();
            const dataBlogPostArray = [];

            for (let dbBlogPosts in myData[props.section]){
                const dataObject = {
                    key: dbBlogPosts,
                    title: myData[props.section][dbBlogPosts].title,
                    content: myData[props.section][dbBlogPosts].content,
                    timestamp: myData[props.section][dbBlogPosts].timestamp
                }
                dataBlogPostArray.push(dataObject);
            }
            setBlogPosts(dataBlogPostArray);
        });
    },[props.section]);

    return(
        <>
            {
                // This was a simple way to show that the blog has been deleted, after you delete it. Intead of rendering the blog it renders a special message (while holding some blog information in state and allowing the user to "remake" it if they want)
                blogPosts.length <= 0
                ?
                <>
                    <h2 className="blogPostSection">BLOG HAS BEEN DELETED</h2>
                    <h2>And all its posts are gone</h2>
                    <div className="blogPostContainer">
                        <h3 className="blogPostHeader">However:</h3>
                        <p className="blogPostContent">If you want, you can restart <strong>{props.section}</strong> right now! </p>
                        <p className="blogPostContent">    • Just make a new post using the form below before navigating away.</p>
                        <p className="blogPostContent">    • Once you navigate away this blog is gone forever. </p>
                    </div>
                </>
                :
                //otherwise it runs through this code and renders the blog and its posts properly 
                <>
                    <h2 className="blogPostSection">{props.section}</h2>
                    <Buttonbox
                        currentPost={null}
                        currentSection={props.section}
                        buttonText={"Delete The Entire Blog"}
                        buttonBoxClass={"deleteWholeBlogBox"}
                        buttonLargeIndividualClass={"deleteAllLarge"}
                        buttonSmallIndividualClass={"deleteAllSmall"}
                    />
                    {
                        // once we've got the array of blog posts, we can just map them into a div with stuff in it that can be consistently styled.
                        blogPosts.map(function(blogpost){
                            return(
                                <div className="blogPostContainer" key={ blogpost.key } >
                                    <h3 className="blogPostHeader">{ blogpost.title }</h3>
                                    <p className="blogPostTimestamp">    { blogpost.timestamp }</p>
                                    {
                                        blogpost.content.split('\n').map((i,index) =>{
                                            return <p key={index} className="blogPostContent">    {i}</p>
                                        })
                                        // THIS IS FROM: 
                                        // https://www.jsdiaries.com/how-to-create-a-new-line-in-jsx-and-reactjs/
                                        // WHAT A LEGENDARY SOLUTION TO THE NEWLINE PROBLEM HOLY SMOKES 
                                        
                                        // Also, put in ALT+255 ascii character (non space blank space) into the above and below code, which solves the quirky issue of indentation
                                    }
                                    <Buttonbox 
                                        currentPost={blogpost}
                                        currentSection={props.section}
                                        buttonText={"Delete This Post"}
                                        buttonBoxClass={"deletePostBox"}
                                        buttonLargeIndividualClass={"fullbutton"}
                                        buttonSmallIndividualClass={"smallbutton"}

                                        />
                                </div>   
                            )
                        })
                    }
                </>
            }

        </>
    )
}


export default GetBlogPosts



