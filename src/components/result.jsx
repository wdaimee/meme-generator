import React from 'react';

const Result = (props) => {
    return(
        <div ref={props.resultContainerRef} className="result"></div>
    )
}

export default Result;