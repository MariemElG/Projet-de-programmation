import React, {useState} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from './Components/PopUp';
import Button from "react-bootstrap/Button";
import './Components/popUp.css'


function App() {
  const [buttonpopUp, setButtonpopUp] = useState(false);

  return (
    <div className="App">
      
      <main> 
        <p>Important question : </p>
        <p> Want to play ? </p>
     
          <Button  onClick={() => setButtonpopUp(true)} > PLay  </Button>
      </main>
            <PopUp trigger={buttonpopUp} setTrigger={setButtonpopUp}>
              <h3>
                Qui est-ce?
              </h3>
              
            </PopUp>
       
   
    </div>
  );
}

export default App;
