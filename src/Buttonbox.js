import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import database from './firebase';

//The Buttonbox component is only to make the delete post button ternary state scoped within it's respective blog post, otherwise they all change (however the functionality is otherwise identical)

const Buttonbox = function(props){
    const { currentPost, currentSection, buttonText, buttonBoxClass, buttonLargeIndividualClass, buttonSmallIndividualClass } = props
    const [confirmDel, setConfirmDel] = useState(false);

    const deleteBlogPost = function(currentPost){
        // this function has a conditional to basically detect if we're deleting the entire blog or just a post, the setcofirm in the "delete blog" half is to force the delete button to reset
        
        let currentRef;
        if (currentPost === null){
            currentRef = ref(database, currentSection);
            setConfirmDel(false);
        } else {
            currentRef = ref(database, `${currentSection }/${currentPost.key}`);
        }
        remove(currentRef)
    }

    return(
        <>
        {
            confirmDel === false
            ?
            <div className={buttonBoxClass}>
                <button onClick={ () =>
                    setConfirmDel(true)
                } className={buttonLargeIndividualClass}>{buttonText}</button>
            </div>
            :
            <div className={buttonBoxClass}>
                <p>Are You Sure: </p>
                <button className={buttonSmallIndividualClass} onClick={ () => deleteBlogPost(currentPost) }>Yes</button>
                <button className={buttonSmallIndividualClass} onClick={ () => setConfirmDel(false) }>No</button>
            </div>
        } 
        </>   
    )
}
export default Buttonbox;