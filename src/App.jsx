"use strict";

import React, { useState } from "react";
import data from "../config.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Button from "react-bootstrap/Button";

function Personnage(props) {
  return (
    <img
      className="Personnage"
      onClick={() => {
        alert(props.name);
      }}
      src={props.src}
      alt={props.name}
    />
  );
}

function Board(props) {
  const [chosenPerson, setChosenPerson] = useState(null);

  return (
    <div>
      {data.possibilites.map((p) => (
        <Personnage
          name={p.prenom}
          src={"/" + data.locationImages + p.fichier}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
