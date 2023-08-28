import { useState, useEffect } from "react";
import { properties } from "../../data/properties";

function Registration(props) {
    const [id, setId] = useState("");
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [driverName, setDriverName] = useState("");
    const [driverPhone, setDriverPhone] = useState("");
    const [driverEmail, setDriverEmail] = useState("");
    const [licencePlate, setLicencePlate] = useState("");
    const [maxPayload, setMaxPayload] = useState(0);
    const [readOperatingInstructions, setReadOperatingInstructions] = useState(false)

    useEffect(() => {
        let queryId = new URLSearchParams(window.location.search).get("id")
        if(queryId != null) {
            setId(queryId)
            fetch(properties.booking + "/" + encodeURIComponent(queryId))
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setFrom(data.from.substring(0,16))
                    setTo(data.to.substring(0,16))
                    setDriverName(data.driverName)
                    setDriverEmail(data.driverEmail)
                    setDriverPhone(data.driverPhone)
                    setMaxPayload(data.maxPayload)
                    setLicencePlate(data.licencePlate)
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            alert("No ID found")
        }
    },[])

    return (
        <div className="container" >
            <label for='transport-id' style={{marginTop: 30}}><h5><b>Transport order: </b>{id}</h5></label>
            <div className="container border bg-light">
                <form style={{marginTop: 10}}>            
                    <div className="row">
                        <h6>Date: {new Date(from).toISOString().substring(0,10).replaceAll('-','.')}<br style={{padding: 10}}/>Time: {new Date(from).toISOString().substring(11,16)} - {new Date(from).toISOString().substring(11,16)}</h6>
                    </div>
                    
                    <div className="mb-3" style={{marginTop: 10}}>
                        <label for='driver'>Driver:</label>
                        <input
                            id='driver'
                            type="text"
                            className='form-control'
                            value={driverName}
                            disabled={true}
                            placeholder=""
                        />
                    </div>
                    <div className="mb-3" style={{marginTop: 10}}>
                        <label for='vehicle'>Vehicle:</label>
                        <input
                            id='vehicle'
                            type="text"
                            className='form-control'
                            value={licencePlate}
                            disabled={true}
                            placeholder=""
                        />
                    </div>
                </form>
            </div>
        </div>);
}

export default Registration;