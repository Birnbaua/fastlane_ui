import React, { useEffect, useState } from "react";
import './Accordion.css'
import done from '../../is_done.png';
import in_progress from '../../in_progress.png';
import not_done from '../../not_done.png';
import qr_icon from '../../qr_code.png';
import testJson from '../../data/test/steps.json';
import QrCode from './QrCode.js';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState
  } from "react-accessible-accordion";
import Registration from "./Registration";
import Location from "./Location";
import { properties } from "../../data/properties.js";
import NoPage from "../NoPage";


function DriverListview(props) {
  const iconStyle = { minWidth: 30, minHeight: 30 };


  const [steps, setSteps] = useState([])
  const [currentLocation, setCurrentLocation] = useState("")
  const [id, setId] = useState(new URLSearchParams(window.location.search).get("id"))
  let current = -1

   function Icon(props) {
    if (props.is_current) {
      current = props.index
      return <img src={in_progress} alt="process-step-in-progress" width={iconStyle.minWidth} height={iconStyle.minHeight}/>;
    } else if(current == -1) {
      return <img src={done} alt="process-step-done" width={iconStyle.minWidth} height={iconStyle.minHeight}/>
    } else {
      return <img src={not_done} alt="process-step-not-done" width={iconStyle.minWidth} height={iconStyle.minHeight}/>
    }
  }

  function Content(step, index) {
    if(step.type === "SIGN_IN") {
      return <QrCode id={id} />
    } else if(step.type === "LOCATION") {
      return (
        <div>
          <Location></Location>
        </div>)
    } else {
      return <div><Location/></div>
    }
  }


   useEffect(() => {
    let queryId = new URLSearchParams(window.location.search).get("id")
    var interval
    if(queryId != null) {
        setId(queryId)
        fetch(properties.driver + "/" + encodeURIComponent(queryId))
            .then(response => {
                return response.json()
            })
            .then(data => {
                setSteps(data)
            })
            .catch(err => {
                console.error(err)
            })

      function getSteps() {
        fetch(properties.driver + "/" + encodeURIComponent(queryId))
          .then(response => {
              return response.json()
          })
          .then(data => {
              setSteps(data.sort((a, b) => a.no - b.no))
          })
          .catch(err => {
              console.error(err)
          })
      }
      getSteps()
      interval = setInterval(() => getSteps(), 1000*10)
    } else {
      window.location.href = '/notFound?url=' + encodeURIComponent(window.location.href);
    }
    return () => {
      clearInterval(interval);
    }
   },[])

   useEffect(() => {
    steps.forEach(step => {
      if(step.is_current) {
        console.log("Current step no: " + step.no)
        if(step.img != null) {
          setCurrentLocation(step.img)
        }
      }
    });
   },[steps])
   
   return (
   <div>
      <div className="sticky-top">
        <Accordion allowZeroExpanded="true">
          <AccordionItem key={-9999} dangerouslySetExpanded={true}> 
            <AccordionItemHeading className={"accordion__heading"}>
              <AccordionItemButton>
                <img src={qr_icon} alt="process-step-done" width={iconStyle.minWidth} height={iconStyle.minHeight}/>
                <span class="menu-item-text">Information</span>
              </AccordionItemButton>
            </AccordionItemHeading>
            
            <AccordionItemPanel>
            <div className="d-flex justify-content-center" style={{maxWidth:"100%"}}>
                <div className="d-flex flex-row-reverse">
                    <div className="col-sm" style={{alignContent: 'center', marginRight: 5}}>
                      {currentLocation ? <Location code={currentLocation} /> : <></>}
                    </div>
                    <div className="col-sm" style={{alignContent: 'center', marginRight: 5}}>
                        {steps.filter((step) => step.type === 'REGISTRATION' && step.is_current) ? <></> :<QrCode id={id}/>}
                    </div>
                </div>
            </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <Accordion allowZeroExpanded="true">

        {
          steps.map(function(step,index) {
            if(step.type === 'REGISTRATION' && step.is_current) {
              current = index
              return (
                <div style={{marginBottom:20}}>
                   <Registration/>
                 </div>
              );
            } else {
              return (
                //<AccordionItem key={index} dangerouslySetExpanded={step.is_current}> 
                <AccordionItem key={index}> 
                  <AccordionItemHeading className={step.is_current ? "accordion__heading active": "accordion__heading"}>
                    <AccordionItemButton>
                      <Icon is_current={step.is_current} index={index} />
                      <span class="menu-item-text">{step.title}</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  
                  <AccordionItemPanel>
                      {(step.type == 'LOADING' || step.type === 'PAPERS') ? 
                        <div>
                          {step.type === 'LOADING' ? <h2>Loading in process...</h2> : <h2>Scan at printstation...</h2>}
                          <QrCode id={id}></QrCode>
                          <span class="menu-item-text">{step.desc}</span>
                        </div> : 
                        <div><Location code={step.img} title={step.title} desc={step.desc}/></div>}
                  </AccordionItemPanel>
                </AccordionItem>
              )
            }
          })
        }
      </Accordion>
   </div>);
    

}

export default DriverListview;