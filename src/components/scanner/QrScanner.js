import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { properties } from "../../data/properties";


function QrScanner(props) {

   const [scanResult, setScanResult] = useState(null)
   const [exists, setExists] = useState(false)
   const [reader, setReader] = useState(null)
   let html5QrcodeScanner;
   let html5QrCode


   useEffect(() => {
      const successCallback = function success(decodedText, decodedResult) {
         const text = decodedText
         console.log(decodedText);
         fetch(properties.driver + "/" + encodeURIComponent(text) + props.path,{method: 'POST'})
                .then(response => {
                    return response.json()
                })
                .then(data => {
                  alert("Successfully scanned")
                  window.location.reload();
                })
                .catch(err => {
                  alert("Scan failed: " + err)
                  console.error(err)
                  window.location.reload();
                })
         html5QrCode?.stop();
         window.location.href = "/scan"
      }
      
      function error(err) {
         console.warn(err)
         console.log("NOT FOUND ANYTHING")
      }
      /*
      try {

         if(!html5QrcodeScanner?.getState()) {
            html5QrcodeScanner = new Html5QrcodeScanner('reader',{
               qrbox: {
                  width: 500,
                  height: 500
               },
               fps: 5
            });
         }
         html5QrcodeScanner.render(success, error);
      } catch(e) {

      }*/

      if(!html5QrCode?.getState()){
         html5QrCode = new Html5Qrcode("reader");
         const config = { fps: 5, qrbox: { width: 250, height: 250 }};
         console.log("TEST")
         // If you want to prefer back camera
         html5QrCode.start({ facingMode: "environment" },config,successCallback,error);
     }

      return () => {
         //html5QrcodeScanner.clear()
       }
   },[])
   
   return <div>
      <h1>QR Code Reader</h1>
      <div id='reader' width={500}></div>
   </div>
    

}

export default QrScanner