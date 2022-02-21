"use strict";

import React, { useState } from "react";
import data from "../config.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Button from "react-bootstrap/Button";
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
  function AttributeSelector(props) {
    const [attribut, setAttribut] = useState(null);

    function handleChange(e) {
      console.log(e.target.value);
      setAttribut(e.target.value);
    }

    return (
      <div>
        <Form.Select name="attribut" onChange={(e) => handleChange(e)}>
          <option>Attribut</option>
          {Object.keys(data.possibilites[0]).map((key) => {
            if (key != "fichier") {
              return <option value={key}>{key}</option>;
            }
          })}
        </Form.Select>
        <QualitySelector attribut={attribut} />
      </div>
    );

    function QualitySelector(props) {
      const filterQualities = (attribut) => {
        const qualites = [];

        data.possibilites.forEach((personnage) => {
          if (!qualites.includes(personnage[attribut])) {
            qualites.push(personnage[attribut]);
          }
        });

        return qualites;
      };

      if (!props.attribut)
        return (
          <Form.Select name="qualite">
            <option>Qualitées</option>
          </Form.Select>
        );

      return (
        <Form.Select name="qualite">
          {filterQualities(props.attribut).map((q) => (
            <option value={q}>{q}</option>
          ))}
        </Form.Select>
      );
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (event.target.attribut.value === "Attribut")
      return alert("Choisir un attribut");
    console.log(event.target.attribut.value);
  }

  return (
    <form className="Menu" onSubmit={(event) => handleSubmit(event)}>
      <Button variant="light" onClick={() => {}}>
        Ajouter
      </Button>{" "}
      <Button variant="light" onClick={() => {}}>
        Enlever
      </Button>{" "}
      <div>
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
