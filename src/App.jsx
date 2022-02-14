"use strict";

import React, { useState } from "react";
import data from "../config.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
  function handleSubmit(event) {
    event.preventDefault();
    selectAttribut("genre");
  }

  function selectAttribut(atr) {
    const attributs = [];

    data.possibilites.forEach((p) => {
      if (!attributs.includes(p[atr])) attributs.push(p[atr]);
    });

    console.log(attributs);
    return attributs;
  }

  return (
    <form className="Menu" onSubmit={handleSubmit}>
      <Button as="" variant="light">
        Ajouter
      </Button>{" "}
      <Button variant="light">Enlever</Button>{" "}
      <div>
        <Dropdown onSelect={() => {}}>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Attribut 1
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Object.keys(data.possibilites[0]).map((key) => {
              if (key != "fichier") {
                return <Dropdown.Item eventKey={key}>{key}</Dropdown.Item>;
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Attribut 2
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Object.keys(data.possibilites[0]).map((key) => {
              if (key != "fichier") {
                return (
                  <Dropdown.Item
                    eventKey={Object.keys(data.possibilites[0]).indexOf(key)}
                  >
                    {key}
                  </Dropdown.Item>
                );
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
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
