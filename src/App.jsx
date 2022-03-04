"use strict";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import data from "../config.json";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const chosenPerson = data.possibilites[Math.floor(Math.random() * data.possibilites.length)];

function Board(props) {
  const [questions, setQuestions] = useState([]);
  const eliminatedUsers = [];


  data.possibilites.forEach((p) => {
    questions.forEach((q) => {
      if ((p[q[0]] === q[1]) !== q[2]) eliminatedUsers.push(data.possibilites.indexOf(p))
    })
  })

  console.log(eliminatedUsers)


  return (
    <div>
      {data.possibilites.map((p) => {
        if (eliminatedUsers.includes(data.possibilites.indexOf(p))) {
          return (
            <span className="ChosenPersonnage">
              <Personnage
                name={p.prenom}
                src={"/" + data.locationImages + p.fichier}
              />
            </span>
          )
        } else {
          return (
            <Personnage
              name={p.prenom}
              src={"/" + data.locationImages + p.fichier}
            />
          );
        }
      })}

      <Menu questions={questions} setQuestions={setQuestions} />
    </div>
  );

  function Personnage(props) {
    return (
      <img
        className="Personnage"
        onClick={() => {
          if (props.name == chosenPerson["prenom"]) { alert("C'est moi ! T'as posé " + questions.length + " questions."); window.location.reload(false); } else { alert("Nope !") }
        }}
        src={props.src}
        alt={props.name}
      />
    );
  }

  function Menu(props) {
    function handleSubmit(event) {
      event.preventDefault();
      if (event.target.attribut.value === "Attribut") return alert("Choisir un attribut")
      if (event.target.qualite.value === chosenPerson[event.target.attribut.value]) { alert("Vrai !") } else { alert("Faux !") }

      props.setQuestions(prevQuestions => ([...prevQuestions, [event.target.attribut.value, event.target.qualite.value, event.target.qualite.value === chosenPerson[event.target.attribut.value]]]))
    }

    return (
      <form className="Menu" onSubmit={(event) => handleSubmit(event)}>

        <div>
          <AttributeSelector />
        </div>

        <Button type="submit" variant="light">
          Valider
        </Button>{" "}
      </form>
    );

    function AttributeSelector(props) {
      const [attribut, setAttribut] = useState(null);

      function handleChange(e) {
        setAttribut(e.target.value);
      }

      return (
        <div>
          <Form.Select name="attribut" onChange={(e) => handleChange(e)}>
            <option>Attribut</option>
            {Object.keys(data.possibilites[0]).map((key) => {
              if (key != "fichier") {
                return <option value={key}>{key}</option>
              }
            })}
          </Form.Select>
          <QualitySelector attribut={attribut} />
        </div>
      )

      function QualitySelector(props) {
        const filterQualities = (attribut) => {
          const qualites = [];

          data.possibilites.forEach((personnage) => {
            if (!qualites.includes(personnage[attribut])) {
              qualites.push(personnage[attribut])
            }
          })

          return qualites;
        }

        if (!props.attribut) return (
          <Form.Select name="qualite">
            <option>Qualités</option>
          </Form.Select>
        )

        return (
          <Form.Select name="qualite">
            {filterQualities(props.attribut).map((q) => (
              <option value={q}>{q}</option>
            ))}
          </Form.Select>
        )
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Board className="Board" />
    </div>
  );
}

export default App;
