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
    },);
    // });
    // },[]);
    //which one??
    // });

    return( 
        <>
            <h2 className="blogPostSection">{props.section}</h2>
            {
            blogPosts.map(function(blogpost){
                return(
                    <div className="blogPostContainer" key={ blogpost.key } >
                        <h3 className="blogPostHeader">{ blogpost.title }</h3>
                        <p className="blogPostTimestamp">{ blogpost.timestamp }</p>
                        
                        {/* THIS IS FROM: 
                        https://www.jsdiaries.com/how-to-create-a-new-line-in-jsx-and-reactjs/
                        WHAT A LEGENDARY SOLUTION TO THE NEWLINE PROBLEM HOLY SMOKES */}
                        {
                            blogpost.content.split('\n').map((i,index) =>{
                                return <p key={index} className="blogPostContent">{i}</p>
                            })
                        }  
                    </div>   
                )
            })
            }
        </>
    )
}

export default GetBlogPosts



