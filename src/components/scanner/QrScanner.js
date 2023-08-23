import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";


function QrScanner(props) {

   /*
   if (window.location.protocol == 'http:') {
      
      console.log("you are accessing us via "
          + "an insecure protocol (HTTP). "
          + "Redirecting you to HTTPS.");
            
      window.location.href =
          window.location.href.replace(
                  'http:', 'https:');
  }
  */

   const [scanResult, setScanResult] = useState(null)

   useEffect(() => {
      var exists = false

      var reader = ""
      var exists = false

      navigator.mediaDevices
         .getUserMedia({'video': true})
         .then((stream) => {
            reader = new Html5Qrcode('reader')
            exists = true
         })
         .catch((err) => {
            console.error('No scanning device found...')
            console.warn("FUCKKKKKK")
            reader = new Html5QrcodeScanner('reader',{
               qrbox: {
                  width: 250,
                  height: 250
               },
               fps: 5
            })
         });
      
      if(exists) {
         reader.start({ facingMode: "environment" },{qrbox: {width: 250,height: 250},fps: 5},success,error).catch(console.warn('no device'));
      } else {
         new Html5QrcodeScanner('reader',{
            qrbox: {
               width: 250,
               height: 250
            },
            fps: 5
         }).render(success, error);
      }

      try {
         document.getElementById("html5-qrcode-button-camera-permission").click();
      } catch(err) {

      }
      
      function success(result) {
         window.location.replace(result)
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