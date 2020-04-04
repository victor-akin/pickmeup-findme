import React from 'react';

function Marker(props) {
    return(
        <div className="marker-container">
            {props.locationText.address && <div className="marker-card">{props.locationText.address}</div>}
            <div className="marker"></div>
        </div>
    );
}

export default Marker