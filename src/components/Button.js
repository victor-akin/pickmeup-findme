import React from 'react';

function Button(props) {
    return(
        <button className="find-me" onClick={props.find}>
            <div className="find-me-icon"> </div>
            <span>FIND ME</span>
        </button>
    );
}

export default Button