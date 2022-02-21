"use strict";

import React, { useState } from "react";
import data from "../config.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";

const random = () => Math.floor(Math.random() * data.possibilites.length); // choose random personnage

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

function Menu(props) {
  // TODO
  function handleSubmit(event) {
    event.preventDefault();
    selectAttribut("genre");
  }


  function AttributeSelector(props) {
    function QualitySelector(props) {
      const [showQualities, setShowQualities] = useState(false)
      const onClick = () => setShowResults(true)
    }

    return (
      <Form.Select aria-label="Default select example" onSelect={() => { }}>
        <option>Attribut</option>

        {Object.keys(data.possibilites[0]).map((key) => {
          if (key != "fichier") {
            return <option value={key}>{key}</option>
          }
        })}
      </Form.Select>
    )
  }





  return (
    <form className="Menu" onSubmit={handleSubmit}>
      <Button variant="light" onClick={() => { }}>
        Ajouter
      </Button>{" "}
      <Button variant="light" onClick={() => { }}>Enlever</Button>{" "}
      <div>
        <AttributeSelector />
        <AttributeSelector />

      </div>
      <Button variant="light">Et</Button> <Button variant="light">Ou</Button>{" "}
      <Button type="submit" variant="light">
        Valider
      </Button>{" "}
    </form>
  );
}

function Board(props) {
  const chosenPerson = random();
  // const [chosenPerson, setChosenPerson] = useState(random());
  const [personnageElimine, setPersonnageElimine] = useState([]);

  return (
    <div>
      {data.possibilites.map((p) => {
        if (chosenPerson === data.possibilites.indexOf(p))
          return (
            <span className="ChosenPersonnage">
              <Personnage
                name={p.prenom}
                src={"/" + data.locationImages + p.fichier}
              />
            </span>
          );

        return (
          <Personnage
            name={p.prenom}
            src={"/" + data.locationImages + p.fichier}
          />
        );
      })}
      <hr></hr>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Board />

      <Menu />
    </div>
  );
}

export default App;
