import { useEffect } from 'react';

const CreateInput = function(props){
    const { type, id, onChange, value, groupClass, groupClassLabel, groupClassInput, labelText } = props
    // console.log(type);
    useEffect(()=>{return (() => {});},[]);
    // what the cuss???

    return(
        <>
        <div className={groupClass}>
            <label htmlFor={id} className={groupClassLabel}>{labelText}</label>
            {
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