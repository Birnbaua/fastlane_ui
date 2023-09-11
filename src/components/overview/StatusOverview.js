import { useState, useEffect } from "react";
import { properties } from "../../data/properties.js";
import { Alert } from "bootstrap";
import { redirect, Redirect } from "react-router-dom";
import formatDateEuro from '../../util/DateTime.js'

function StatusOverview(props) {
    const [orders, setOrders] = useState([]);
    const [gateOpen1, setGateOpen1] = useState(false);
    const [gateOpen2, setGateOpen2] = useState(false);

    useEffect(() => {
        function getOrders() {
            fetch(properties.statusOverview)
              .then(result => result.json())
              .then(result => setOrders(result))
              .catch(err => console.error(err))
          }
          getOrders()
          const interval = setInterval(() => getOrders(), 1000*5)

          function getGateStatus() {
            fetch(properties.gateStatus)
              .then(result => result.json())
              .then(result => {
                    for (const g of result) { 
                        if(g.id === "G1") { setGateOpen1(g.isOpen) }
                        else if(g.id === "G2") { setGateOpen2(g.isOpen)}
                     }
              })
              .catch(err => console.error(err))
          }
          getOrders()
          const interval1 = setInterval(() => getGateStatus(), 1000*5)
          return () => {
            clearInterval(interval);
            clearInterval(interval1);
          }
    },[])

    return (
        <div>
            <div className="container" style={{backgroundColor: "lightgray", marginTop:10}}>
                <h1 className="text-center" color="grey">Auftragsübersicht</h1>
            </div>
            <div className="container ">
                <div className="d-flex flex-row-reverse">
                    <div className="col-sm" style={{alignContent: 'center' }}>
                        <img alt="facebook" width={80} src={gateOpen1 ? "/img/other/gate_open.png" : "/img/other/gate_closed.png"} />
                        <h2>Gate 1 {gateOpen1 ? "open":"closed"}</h2>
                    </div>
                    <div className="col-sm" style={{alignContent: 'center'}}>
                        <img alt="facebook" width={80} src={gateOpen2 ? "/img/other/gate_open.png" : "/img/other/gate_closed.png"}  />
                        <h2>Gate 2 {gateOpen2 ? "open":"closed"}</h2>
                    </div>
                </div>
            </div>
            <div className="container">
                <table className="table table-striped"  style={{ fontSize: 30 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Carrier</th>
                            <th>Date</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(function(order) {
                            return <tr >
                                <td style={order.id.startsWith("9") == false ? {backgroundColor: "green"} : {}}>{order.id}</td>
                                <td>{order.carrier}</td>
                                <td>{formatDateEuro(order.from)}</td>
                                <td>{order.from.substring(11,16)}</td>
                                <td>{order.to.substring(11,16)}</td>
                                <td>{order.type}</td>
                                <td>{order.status}</td>
                                <td>{order.location}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatusOverview;