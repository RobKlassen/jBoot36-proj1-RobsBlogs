import {useEffect} from 'react';

const GetSection = function(props){

    useEffect(()=>{return (() => {});},[]);

    return(
        <li>
            <p>{props.section}</p>
        </li>
    )
}

export default GetSection;
