import React, { useEffect, useState } from "react";
import { properties } from "../data/properties.js";

function QrCode(props) {

    const[code, setCode] = useState("")

    useEffect(() =>{
        fetch(properties.qr_code_base_url + "?id=" + props.id)
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
        <div>
            <img src={"data:image/png;base64," + code} alt="Red dot" />
        </div>
    );
    

}

export default QrCode