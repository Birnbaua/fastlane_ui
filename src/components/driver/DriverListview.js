import React, { useEffect, useState } from "react";
import './Accordion.css'
import done from '../../is_done.png';
import in_progress from '../../in_progress.png';
import not_done from '../../not_done.png';
import testJson from '../../data/test/steps.json';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState
  } from "react-accessible-accordion";


function DriverListview(props) {
    const iconStyle = { minWidth: 30, minHeight: 30 };


   const [steps, setSteps] = useState(testJson)
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

   useEffect(() => {
      
   },[])
   
   return <div>
      <Accordion allowZeroExpanded="true">

        {
          steps.map((step, index) => (
            <AccordionItem key={index} dangerouslySetExpanded={step.is_current}> 
              <AccordionItemHeading className={step.is_current ? "accordion__heading active": "accordion__heading"}>
                <AccordionItemButton>
                  <Icon is_current={step.is_current} index={index} />
                  <span class="menu-item-text">{step.title}</span>
                </AccordionItemButton>
              </AccordionItemHeading>
              
              <AccordionItemPanel>
                  This is Option A
              </AccordionItemPanel>
            </AccordionItem>
          ))
        }

      </Accordion>
   </div>
    

}

export default DriverListview;