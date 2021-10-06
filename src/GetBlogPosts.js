import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './firebase';
// import GetSection from './GetSection';

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
    },[]);

    

    return( 
        <>
            <h2 className="blogPostSection">{props.section}</h2>
            {
            blogPosts.map(function(blogpost){
                return(
                    <div className="blogPostContainer" key={ blogpost.key } >
                        <h3 className="blogPostHeader">{ blogpost.title }</h3>
                        <p className="blogPostTimestamp">{ blogpost.timestamp }</p>
                        <p className="blogPostContent">{ blogpost.content }</p>
                    </div>
                    // <>
                    //     <GetSection key={ blogpost.key+"title" } section={ blogpost.title }/>
                    //     <GetSection key={ blogpost.key+"content" } section={ blogpost.content }/>
                    //     <GetSection key={ blogpost.key+"content" } section={ blogpost.timestamp }/>
                    // </>      
                )
            })
            }
        </>
    )
}

export default GetBlogPosts