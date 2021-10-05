import { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import database from './firebase';
import GetSection from './GetSection';

const GetBlogPosts = function(props){
    const [blogPosts, setBlogPosts] = useState([]);

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
        blogPosts.map(function(blogpost){
            return(
                <>
                    <GetSection key={ blogpost.key+"title" } section={ blogpost.title }/>
                    <GetSection key={ blogpost.key+"content" } section={ blogpost.content }/>
                    <GetSection key={ blogpost.key+"content" } section={ blogpost.timestamp }/>
                </>      
            )
        })
    )
}

export default GetBlogPosts