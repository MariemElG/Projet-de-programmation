import React from 'react'

import { propTypes } from 'react-bootstrap/esm/Image'
function popUp (props){
    return (props.trigger) ? (
        <div className = "popUp">
             <div className = "popUp-inner">
                 <button className="close-btn" onClick={()=> propTypes.setTrigger (false)}> 
                 Get rid of me
                 </button>
                 {props.children}
             </div>
    

        </div>
    ) : "";
}
export default popUp