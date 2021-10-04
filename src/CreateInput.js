import { useEffect } from 'react';

const CreateInput = function(props){
    const { type, id, onChange, value } = props
    
    useEffect(()=>{return (() => {});},[]);
    // what the hell???

    return(
        <>
            <label htmlFor={id}>Title for your new blog: </label>
            <input 
                type={ type } 
                id={ id }
                onChange={ onChange }
                value={ value }/>
        </>
    )
}

export default CreateInput