import { useState, useEffect } from "react";
import { properties } from "../../data/properties.js";
import { Alert } from "bootstrap";
import { redirect, Redirect } from "react-router-dom";
import test_data from '../../data/test/status.json'

function StatusOverview(props) {
    const [orders, setOrders] = useState(test_data);
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

    /*
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

                })
                .catch(err => {
                    console.error(err)
                })
                setLoading(false)
        }
        console.log("Test after " + from)

    },[])
    */

    return (
        <div>
            <div className="container">
                <div className="d-flex flex-row-reverse">
                    <div className="col-sm" style={{alignContent: 'center' }}>
                        <img alt="facebook" width={80} src={gateOpen1 ? "/img/other/gate_open.png" : "/img/other/gate_closed.png"} />
                    </div>
                    <div className="col-sm" style={{alignContent: 'center'}}>
                        <img alt="facebook" width={80} src={gateOpen2 ? "/img/other/gate_open.png" : "/img/other/gate_closed.png"}  />
                    </div>
                </div>
            </div>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Carrier</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                            <th>Step</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(function(order) {
                            return <tr>
                                <td>{order.id}</td>
                                <td>{order.carrier}</td>
                                <td>{order.from}</td>
                                <td>{order.to}</td>
                                <td>{order.status}</td>
                                <td>{order.step}</td>
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