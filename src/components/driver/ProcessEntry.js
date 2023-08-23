import React, { useEffect, useState } from "react";
import { properties } from "../data/properties.js";

function ProcessEntry(props) {

    const[entries, setEntries] = useState([])
    const[code, setCode] = useState("")

    useEffect(() =>{
        fetch(properties.process_entries_base_url)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           setEntries(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
    },[])

    useEffect(() =>{
        fetch(properties.qr_code_base_url)
        .then((response) => response.text())
        .then((data) => {
           console.log(data);
           setCode(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
    },[])

    return
    

}

export default ProcessEntry