import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";


function QrScanner(props) {

   const [scanResult, setScanResult] = useState(null)

   useEffect(() => {
      const scanner = new Html5QrcodeScanner('reader',{
         qrbox: {
            width: 250,
            height: 250
         },
         fps: 5,
      })

      scanner.render(success, error);

      function success(result) {
         scanner.clear()
         window.location.replace(result);
      }
   
      function error(err) {
         console.warn(err)
      }
   },[])
   
   return <div>
      <h1>QR Code Reader</h1>
      <div id='reader'></div>
   </div>
    

}

export default QrScanner