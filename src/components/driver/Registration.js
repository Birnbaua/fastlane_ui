import { useState, useEffect } from "react";
import { properties } from "../../data/properties";
import signs_json from "../../data/img/signs.json";
import rules_json from "../../data/rules.json";

function Registration(props) {
    const [signs, setSigns] = useState(signs_json)
    const [rules, setRules] = useState(rules_json)
    const [checkedData, setCheckedData] = useState(false)
    const [checkedRules, setCheckedRules] = useState(false)
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

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(from + "+" + (new Date(from).getTimezoneOffset()*-1)/60)
            let res = await fetch(properties.driver + "/" + encodeURIComponent(id) +"/acknowledge", {
                method: "POST",
                headers: new Headers({'content-type': 'application/json'}),
            });
            let resJson = await res.json();
            if (res.status === 201 || res.status === 200) {
                window. location. reload();
            } else {
                alert(res.statusText)
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
    };

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
            <h2><b>Hinweisschilder</b></h2>
            {signs.map(function(sign,index) {
                return <div className="App" id={sign.name}>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{  flex: 1, padding: 10}}>
                            <img alt="notruf" width="100%" src={"/img/signs/"+sign.file} />
                        </div>
                        <div class="side side-content-center" style={{flex: 1, padding: 5, display: 'flex', alignItems: 'center'}}>
                            <div>
                                <p><h2>{sign.name}</h2></p>
                            </div>
                        </div>
                    </div>
               </div>
            })}
            <div>
                <h2><b>Verhaltensregeln</b></h2>
                <ul>
                    {rules.map(function(rule,index) {
                        return <li>{rule.desc}</li>
                    })}
                </ul>
            </div>


            <form onSubmit={handleSubmit}>            
            <label for='transport-id' style={{marginTop: 20}}><h5><b>Bestätigen</b></h5></label>
            <div className="container border bg-light">
                <div className="mb-3">
                    <label for='edit-id'>Daten</label>
                    <input style={{marginLeft: 5}}
                        id='edit-id'
                        type="checkbox"
                        required={true}
                        name="Edit:"
                    />
                </div>
                <div className="mb-3">
                    <label for='edit-id'>Hinweise & Regeln</label>
                    <input style={{marginLeft: 5}}
                        id='edit-id'
                        type="checkbox"
                        required={true}
                        name="Edit:"
                    />
                </div>
            </div>
            <button type="submit" className='btn btn-default' style={{backgroundColor: "green", marginTop: 10}}>Bestätigen</button>
        </form>
        </div>);
}

export default Registration;