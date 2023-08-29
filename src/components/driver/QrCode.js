import React, { useEffect, useState } from "react";
import { properties } from "../../data/properties.js";

function QrCode(props) {

    const[code, setCode] = useState("")

    useEffect(() =>{
        fetch(properties.qr_code_base_url + "?id=" + encodeURIComponent(props.id))
        .then((response) => response.text())
        .then((data) => {
           console.log(data);
           setCode(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
    },[])

    return (
        <div style={{maxWidth: 500}}>
            <div className="row" style={{alignContent: 'center'}}>
                <img alt="facebook" width="90%" src={"data:image/png;base64," + code} />
            </div>
        </div>
    );
    

}

export default QrCode;