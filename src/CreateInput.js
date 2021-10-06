// The purpose of this componenent is to create the actual inputs with values appropriate to their function, 


import { useEffect } from 'react';

const CreateInput = function(props){
    const { type, id, onChange, value, groupClass, groupClassLabel, groupClassInput, labelText } = props
    
    useEffect(()=>{return (() => {});},[]);
    // what the cuss???
    // ( condensed the memory leak plug and it's hilarious )

    return(
        <>
        <div className={groupClass}>
            <label htmlFor={id} className={groupClassLabel}>{labelText}</label>
            {
                // The ternary is for the event that we need a textarea instead of a textinput - I wish I could've condensed it further but JSXhtml elements don't like being broken in half.  Technically can be made sort of modular in the event I needed another type of input 
                type==="text"
                ?
                    <input 
                        className={ groupClassInput }
                        type={ type } 
                        id={ id }
                        onChange={ onChange }
                        value={ value }/>
                :
                    <textarea 
                        className={ groupClassInput }
                        type={ type } 
                        id={ id }
                        onChange={ onChange }
                        value={ value }/>  
            }
        </div>
        </>
    )
}

export default CreateInput