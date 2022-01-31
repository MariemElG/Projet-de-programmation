import React from 'react'

import { propTypes } from 'react-bootstrap/esm/Image'
function popUp (props){
    return (props.trigger) ? (
        <div className = "popUp">
             <div className = "popUp-inner">
                 <button className="closebutton"> 
                 Get rid of me
                 </button>
                 {propTypes.children}
             </div>
    

        </div>
    ) : "";
}
export default popUp