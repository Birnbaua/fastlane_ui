import { useState, useEffect } from "react";
import { properties } from "../../data/properties.js";
import { Alert } from "bootstrap";
import { redirect, Redirect } from "react-router-dom";
import test_data from '../../data/test/status.json'

function ScannerHome(props) {

    return (
        <div style={{marginRight: 10}}>
            <div className="container" style={{backgroundColor: "lightgray", marginTop:10}}>
                <h1 className="text-center" color="grey">Scan Home</h1>
            </div>
            <div className="container d-flex justify-content-center" style={{maxWidth:"100%"}}>
                <div className="d-flex flex-row-reverse">
                    <div className="col-sm" style={{alignContent: 'center'}}>
                        <a href="/scan/step"><img alt="facebook" width="100%" src="/img/other/step_forward.png"  /></a>
                    </div>
                    <div className="col-sm" style={{alignContent: 'center', marginRight: 5}}>
                        <a href="/scan/gate"><img alt="facebook" width="100%" src="/img/other/scan_gate.png" /></a>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-center" style={{marginTop: 5, maxWidth:"100%"}}>
                <div className="d-flex flex-row-reverse">
                    <div className="col-sm" style={{alignContent: 'center'}}>
                        <a href="/scan/end"><img alt="facebook" width="100%" src="/img/other/end_loading.png"  /></a>
                    </div>
                    <div className="col-sm" style={{alignContent: 'center', marginRight: 5}}>
                        <a href="/scan/start"><img alt="facebook" width="100%" src="/img/other/start_loading.png" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScannerHome;