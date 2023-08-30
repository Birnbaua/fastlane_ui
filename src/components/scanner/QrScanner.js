import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { properties } from "../../data/properties";


function QrScanner(props) {

   const [scanResult, setScanResult] = useState(null)
   const [exists, setExists] = useState(false)
   const [reader, setReader] = useState(null)


   useEffect(() => {
      var html5QrcodeScanner = new Html5QrcodeScanner('reader',{
         qrbox: {
            width: 250,
            height: 250
         },
         fps: 5
      });

      function success(decodedText, decodedResult) {
         html5QrcodeScanner.clear();
         console.log(decodedText);
         fetch(properties.driver + "/" + encodeURIComponent(decodedText) + "/signIn",{method: 'POST'})
                .then(response => {
                    return response.json()
                })
                .then(data => {
                  alert("Successfully scanned")
                  window.location.reload();
                })
                .catch(err => {
                    console.error(err)
                    window.location.reload();
                })
      }
      
      function error(err) {
         console.warn(err)
      }
      
      html5QrcodeScanner.render(success, error);

   },[])
   
   return <div>
      <h1>QR Code Reader</h1>
      <div id='reader' width={500}></div>
   </div>
    

}

export default QrScanner