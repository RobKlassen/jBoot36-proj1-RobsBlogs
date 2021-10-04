import { useState } from 'react'    
const Footer = function(){

    const [userInput, setUserInput] = useState("");
    
    const handleSubmit = function(event){
        event.preventDefault();
    }
    
    const handleChange = function(event){
        setUserInput(event.target.value);
    }
    

    return(
        <footer>
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
            <p>Coded by Rob</p>
        </footer>
    )
}

export default Footer