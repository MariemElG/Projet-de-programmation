import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import popUp from './Components/popUp';
import Button from "react-bootstrap/Button";

function App() {
  const [count, setCount] = useState(0);

  //const htmlelement = document.getElementById('#gam') : js
 // htmlelement.innerHTML += "<div class=”card”><img src=”img/’ + pics[i] + ‘ “></div>" : js
  // $(“#gameboard”).append(‘<div class=”card”><img src=”img/’ + pics[i] + ‘ “></div>’) : jquery

  



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <p>Important question : </p>
        <p>
          <button type="button"// onClick={() => setCount((count) => count + 12)}
          >
            <popUp trigger={}>
              <h3>
                Qui est-ce?
              </h3>
            </popUp>
            Want to play ? 
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
