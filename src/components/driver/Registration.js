import { useState, useEffect } from "react";
import { properties } from "../../data/properties";

function Registration(props) {
    const [id, setId] = useState("");
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [driverName, setDriverName] = useState("");
    const [licencePlate, setLicencePlate] = useState("");
    const [maxPayload, setMaxPayload] = useState(0);
    const [readOperatingInstructions, setReadOperatingInstructions] = useState(false)

    useEffect(() => {
        let queryId = new URLSearchParams(window.location.search).get("id")
        if(queryId != null) {
            setId(queryId)
            fetch(properties.booking + "/" + encodeURIComponent(id))
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setFrom(data.from)
                    setTo(data.to)
                    setDriverName(data.driverName)
                    setMaxPayload(data.maxPayload)
                    setLicencePlate(data.licencePlate)
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            console.error("No id found")
        }
    },[])

    return (<div>

    </div>);
}

export default Registration;