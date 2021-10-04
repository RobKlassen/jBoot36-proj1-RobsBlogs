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
            <p>Coded by Rob</p>
        </footer>
    )
}

export default Footer