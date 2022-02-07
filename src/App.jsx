import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from './Componenets/PopUp';
import Button from "react-bootstrap/Button";
import './popUp.css'
import {useState} from 'react';

function App() {
  const [buttonpopUp, setButtonpopUp] = useState(false);

  return (
    <div className="App">
      
      <main> 
        <p>Important question : </p>
     
          <Button  onClick={() => setButtonpopUp(true)} > PLay  </Button>
      </main>
            <PopUp trigger={buttonpopUp} setTrigger={setButtonpopUp}>
              <h3>
                Qui est-ce?
              </h3>
              <p> Want to play ? </p>
            </PopUp>
           
          
  
       
   
    </div>
  );
}

export default App;
