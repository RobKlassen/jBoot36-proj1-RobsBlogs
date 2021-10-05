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
            <p>Rob Klassen - Juno College of Technology, Cohort 36, Project 3 </p>
        </footer>
    )
}

export default Footer