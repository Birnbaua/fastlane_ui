import { useState, useEffect } from "react";
import { properties } from "../../data/properties.js";
import { Alert } from "bootstrap";
import { redirect, Redirect } from "react-router-dom";

function BookingPost(props) {
    const [id, setId] = useState("");
    const [carrier, setCarrier] = useState("");
    const [editId, setEditId] = useState(false);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [cargoDescription, setCargoDescription] = useState("");
    const [loadingType, setLoadingType] = useState("unknown");
    const [licencePlate, setLicencePlate] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverPhone, setDriverPhone] = useState("");
    const [driverEmail, setDriverEmail] = useState("");
    const [maxPayload, setMaxPayload] = useState(0);
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Create");

    const checkHandler = () => {
        setEditId(!editId)
    };

    useEffect(() => {
        let queryId = new URLSearchParams(window.location.search).get("id")
        if(queryId != null) {
            setId(queryId)
            setLoading(true)
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
                    setCarrier(data.carrier)
                    setCargoDescription(data.cargoDescription)
                    setLoadingType(data.loadingType)
                    setButtonText("Update")
                })
                .catch(err => {
                    console.error(err)
                })
                setLoading(false)
        }
        console.log("Test after " + from)

    },[])

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(from + "+" + (new Date(from).getTimezoneOffset()*-1)/60)
            let res = await fetch(properties.booking + "/" + encodeURIComponent(id), {
                method: "PUT",
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({
                    driverName: driverName,
                    driverEmail: driverEmail,
                    driverPhone: driverPhone,
                    carrier: carrier,
                    cargoDescription: cargoDescription,
                    loadingType: loadingType,
                    from: from + "+0" + (new Date(from).getTimezoneOffset()*-1)/60,
                    to: to + "+0" + (new Date(to).getTimezoneOffset()*-1)/60,
                    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    licencePlate: licencePlate,
                    maxPayload: maxPayload
                }),
            });
            let resJson = await res.json();
            if (res.status === 201 || res.status === 200) {
                window.location.href = '/booking/success?id=' + encodeURIComponent(id);
            } else {
                alert(res.status + " " + res.statusText)
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
    };

    useEffect(() =>{
        console.info("From: "+from)
        if(from != null && !loading) {
            var str = from;    
            var date = new Date(str);
            date.setHours(date.getHours() + Math.abs(date.getTimezoneOffset()/60) + 2, date.getMinutes(), 0)
            console.info("To: "+date.toISOString().substring(0,16))
            setTo(date.toISOString().substring(0,16))
        }
    },[from]);

    return (
        <div>
        <div className="container" style={{backgroundColor: "lightgray", marginTop:10}}>
            <h1 className="text-center" color="grey">VFI GmbH</h1>
        </div>
        <div className="container">
        <form onSubmit={handleSubmit}>                     
            <label for='transport-id' style={{marginTop: 20}}><h5><b>Transport ID</b></h5></label>
            <div className="container border bg-light input-group">
                <div className="mb-3" style={{marginTop: 10}}>
                    <label for='transport-id'>ID:</label>
                    <input
                        id='transport-id'
                        type="text"
                        className='form-control'
                        required={true}
                        value={id}
                        disabled={!editId}
                        placeholder=""
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="mb-3" style={{marginTop: 50, marginLeft: 10}}>
                    <label for='edit-id'>Edit: </label>
                    <input style={{marginLeft: 5}}
                        id='edit-id'
                        type="checkbox"
                        checked={editId}
                        name="Edit:"
                        onChange={checkHandler}
                    />
                </div>
            </div>
            <label for='transport-id' style={{marginTop: 20}}><h5><b>Carrier Details</b></h5></label>
            <div className="container border bg-light">
                <div className="mb-3" style={{marginTop: 10}}>
                    <label for='carrier'>Name:</label>
                    <input
                        id='carrier'
                        type="text"
                        className='form-control'
                        required={true}
                        value={carrier}
                        placeholder=""
                        onChange={(e) => setCarrier(e.target.value)}
                    />
                </div>
            </div>   
            <label for='start-datetime' style={{marginTop: 20}}><h5><b>Time-Window ({Intl.DateTimeFormat().resolvedOptions().timeZone})</b></h5></label>
            <div className="container border bg-light input-group">
                <div className="mb-3" style={{marginTop: 10}}>
                    <label for='start-datetime'>From:</label>
                    <input
                        id='start-datetime'
                        type="datetime-local"
                        className='form-control'
                        required={true}
                        value={from}
                        placeholder="Datetime"
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div className="mb-3" style={{marginTop: 10, marginLeft: 10}}>
                    <label for='end-datetime'>To:</label>
                    <input
                        id='end-datetime'
                        type="datetime-local"
                        className='form-control'
                        value={to}
                        disabled={true}
                        placeholder="Datetime"
                        //onChange={(e) => setTo(e.target.value)}
                    />
                </div>
            </div>
            <label for='start-datetime' style={{marginTop: 20}}><h5><b>Driver</b></h5></label>
            <div className="container border gap-3 bg-light input-group">
                <div className='mb-3' style={{marginTop: 10}}>
                    <label for='driver-name'>Name:</label>
                    <input
                        id='driver-name'
                        type="text"
                        className='form-control'
                        value={driverName}
                        placeholder="First and Lastname"
                        onChange={(e) => setDriverName(e.target.value)}
                    /> 
                </div>
                <div className="mb-3" style={{marginTop: 10, marginLeft: 10}}>
                    <label for='driver-phone'>Phone:</label>
                    <input
                        id='driver-phone'
                        type="tel"
                        value={driverPhone}
                        pattern='\+\d{5,}'
                        className='form-control'
                        required={true}
                        placeholder="Mobile Number"
                        onChange={(e) => setDriverPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3" style={{marginTop: 10, marginLeft: 10}}>
                    <label for='phone'>Email:</label>
                    <input
                        id='driver-email'
                        type="email"
                        value={driverEmail}
                        className='form-control'
                        placeholder="Email"
                        onChange={(e) => setDriverEmail(e.target.value)}
                    />
                </div>
            </div>
            <label for='start-datetime' style={{marginTop: 20}}><h5><b>Vehicle</b></h5></label>
            <div className="container border bg-light input-group">
                <div className='mb-3' style={{marginTop: 10}}>
                    <label for='licence-plate'>Licence plate:</label>
                    <input
                        id='licence-plate'
                        type="text"
                        className='form-control'
                        value={licencePlate}
                        placeholder="Licence plate"
                        onChange={(e) => setLicencePlate(e.target.value)}
                    /> 
                </div>
                <div className='mb-3' style={{marginTop: 10, marginLeft: 10}}>
                    <label for='max-payload'>Maximum payload (tons):</label>
                    <input
                        id='max-payload'
                        type="number"
                        min={0}
                        className='form-control'
                        value={maxPayload}
                        placeholder="Max payload"
                        onChange={(e) => setMaxPayload(e.target.value)}
                    /> 
                </div>
            </div>            
            <label for='start-datetime' style={{marginTop: 20}}><h5><b>Cargo Details</b></h5></label>
            <div className="container border bg-light">
                <div className='mb-3' style={{marginTop: 10}}>
                    <label for='cargo-desc'>Cargo description:</label>
                    <textarea
                        id='cargo-desc'
                        rows={4}
                        className='form-control'
                        value={cargoDescription}
                        placeholder=""
                        onChange={(e) => setCargoDescription(e.target.value)}
                    /> 
                </div>
                <div className='mb-3' style={{marginTop: 10}}>
                    <label for='loading-type'>Loading type:</label>
                    <select
                        id='loading-type'
                        className='form-control'
                        value={loadingType}
                        onChange={(e) => setLoadingType(e.target.value)}
                    > 
                        <option value="loading">Loading</option>
                        <option value="unloading">Unloading</option>
                        <option value="combined">Combined</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
            </div>

            <button type="submit" className='btn btn-default' style={{backgroundColor: "green", marginTop: 10, marginBottom: 10}}>{buttonText}</button>
        </form>
        </div>
        </div>
    );
}

export default BookingPost;