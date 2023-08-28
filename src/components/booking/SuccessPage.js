import React, { useEffect, useState } from "react";

function SuccessPage(props) {

    return (
        <div className="d-flex justify-content-center" style={{alignContent: "center"}}>
            <div class="card" style={{"width": "36rem", marginTop: 50}}>
            <div class="card-body" style={{background: '#EBF0F5'}}>
                <h1 class="card-title" style={{color: '#88B04B', textAlign: "center"}}>Success</h1>
                <h4 class="card-subtitle mb-2 text-muted" style={{textAlign: "center"}}>ID: {new URLSearchParams(window.location.search).get("id")}</h4>
                <p class="card-text">We have received your booking. <br/>Your driver will be informed before the transport to finish registration.</p>
                <a href={"/booking"} class="card-link">Book another</a>
                <a href={"/booking?id=" + encodeURIComponent(new URLSearchParams(window.location.search).get("id"))} class="card-link">Edit data</a>
            </div>
        </div>
        </div>

    );
};

export default SuccessPage;