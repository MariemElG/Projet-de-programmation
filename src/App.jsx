import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import popUp from './Componenets/popUp';
import Button from "react-bootstrap/Button";
import './popUp.css'
import {useState} from 'react';

function App() {
  const [buttonpopUp, setButtonpopUp] = useState(false);

  //const htmlelement = document.getElementById('#gam') : js
 // htmlelement.innerHTML += "<div class=”card”><img src=”img/’ + pics[i] + ‘ “></div>" : js
  // $(“#gameboard”).append(‘<div class=”card”><img src=”img/’ + pics[i] + ‘ “></div>’) : jquery

  



  return (
    <div className="App">
      
      <main> 
        <p>Important question : </p>
     
          <button type="button" onClick={() => setButtonpopUp(true)} >Open popUp </button>
      </main>
            <popUp trigger={buttonpopUp} setTrigger={setButtonpopUp}>
              <h3>
                Qui est-ce?
              </h3>
              <p> Want to play ? </p>
            </popUp>
           
          
  
       
   
    </div>
  );
}

export default App;
