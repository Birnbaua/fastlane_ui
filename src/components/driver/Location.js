import React, { useEffect, useState } from "react";

function Location(props) {
    return (
        <div style={{maxWidth: 500}}>
            <div className="row" style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <h2 className="col-md-6 col-md-offset-3">{props.title}</h2>
            </div>
            <div className="row" style={{alignContent: 'center'}}>
                <img alt="facebook" width="90%" src={'/img/' + props.code + ".png"} />
            </div>
            
            <div className="row" style={{alignContent: 'center', marginLeft: 1, marginRight: 1, marginTop: 2}}>
                <p>{props.desc}</p>
            </div>
        </div>
    );
    

}

export default Location;