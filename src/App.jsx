"use strict";

import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import data from "../config.json";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const savedGame = localStorage.getItem('session');

const chosenPerson = savedGame ? JSON.parse(savedGame).chosenPerson :
  data.possibilites[Math.floor(Math.random() * data.possibilites.length)];

function Title(props) {
  return (
    <h1 className="Title">
      {" "}
      <span className="guess"> Guess</span> Who?{" "}
    </h1>
  );
}

const HomePage = () => {
  const [buttonpopUp, setButtonpopUp] = useState(false);

  if (savedGame) {
    const savedGameData = JSON.parse(savedGame);

    return (
      <div className="homePage">
        <div className="buttonList">
          <ul>
            <li>
              <button
                class="button"
                type="button"
                onClick={() => {
                  setButtonpopUp(true);
                }}
              >
                Single-player
              </button>
            </li>
            <li>
              <br />
              <button class="button" type="button">
                Multi-player
              </button>
            </li>
            <li>
              <br />

              <button
                class="button"
                type="button"
                onClick={(event) => (window.location.href = "src/about.html")}
              >
                What is Guess Who?
              </button>
            </li>
          </ul>
          <br></br>
        </div>
        <PopUp trigger={buttonpopUp} setTrigger={setButtonpopUp}>
          {" "}
          <Board savedGameData={savedGameData} />
        </PopUp>
      </div>
    );
  }

  return (
    <div className="homePage">
      <div className="buttonList">
        <ul>
          <li>
            <button
              class="button"
              type="button"
              onClick={() => {
                setButtonpopUp(true);
              }}
            >
              Single-player
            </button>
          </li>
          <li>
            <br />
            <button class="button" type="button">
              Multi-player
            </button>
          </li>
          <li>
            <br />

            <button
              class="button"
              type="button"
              onClick={(event) => (window.location.href = "src/about.html")}
            >
              What is Guess Who?
            </button>
          </li>
        </ul>
        <br></br>
      </div>
      <PopUp trigger={buttonpopUp} setTrigger={setButtonpopUp}>
        {" "}
        <Board savedGameData={{ questions: [], mistakeNumber: 0 }} />
      </PopUp>
    </div>
  );
};


function PopUp(props) {
  return props.trigger ? (
    <div className="PopUp">
      <div className="PopUp-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          x
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

function Board(props) {
  const [questions, setQuestions] = useState(props.savedGameData.questions);
  const [mistakeNumber, setMistakeNumber] = useState(props.savedGameData.mistakeNumber);

  const eliminatedUsers = [];
  data.possibilites.forEach((p) => {
    questions.forEach((q) => {
      if ((p[q[0]] === q[1]) !== q[2])
        eliminatedUsers.push(data.possibilites.indexOf(p));
    });
  });

  return (
    <div>
      {data.possibilites.map((p) => {
        if (eliminatedUsers.includes(data.possibilites.indexOf(p))) {
          return (
            <span className="PersonnageElimine">
              <Personnage
                name={p.prenom}
                src={"/" + data.locationImages + "no.jpg"}
                questions={questions}
                setQuestions={setQuestions}
              />
            </span>
          );
        } else {
          return (
            <Personnage
              name={p.prenom}
              src={"/" + data.locationImages + p.fichier}
              questions={questions}
              mistakeNumber={mistakeNumber}
              setMistakeNumber={setMistakeNumber}
            />
          );
        }
      })}

      <Menu questions={questions} setQuestions={setQuestions} mistakeNumber={mistakeNumber} />
    </div>
  );


  function Personnage(props) {
    return (
      <img
        className="Personnage"
        onClick={() => {
          if (props.name == chosenPerson["prenom"]) {
            alert(
              "C'est moi ! T'as posé " +
              (props.mistakeNumber * 3 + props.questions.length) +
              " questions."
            );
            localStorage.removeItem('session');
            window.location.reload(false);
          } else {
            alert(
              "Nope ! Comme punition, votre nombre de questions a été augmenté de trois."
            );
            setMistakeNumber(mistakeNumber + 1);
          }
        }}
        src={props.src}
        alt={props.name}
      />
    );
  }

  function Menu(props) {
    function handleSubmit(event) {
      event.preventDefault();
      if (event.target.attribut.value === "Attribut")
        return alert("Choisir un attribut");
      if (
        event.target.qualite.value === chosenPerson[event.target.attribut.value]
      ) {
        alert("Vrai !");
      } else {
        alert("Faux !");
      }

      props.setQuestions((prevQuestions) => [
        ...prevQuestions,
        [
          event.target.attribut.value,
          event.target.qualite.value,
          event.target.qualite.value ===
          chosenPerson[event.target.attribut.value],
        ],
      ]);
    }

    function handleSaveClick() {
      localStorage.setItem('session', JSON.stringify({ chosenPerson, questions: props.questions, mistakeNumber: props.mistakeNumber }));
      window.location.reload(false);
    }

    return (
      <form className="Menu" onSubmit={(event) => handleSubmit(event)}>
        <div>
          <AttributeSelector />
        </div>
        <Button type="submit" variant="light" className="button">
          Valider
        </Button>{" "}
        <Button onClick={() => handleSaveClick()} variant="light" className="button" >
          Sauvgarder
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
          <Form.Select
            name="attribut"
            onChange={(e) => handleChange(e)}
            className="button"
          >
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
            if (
              !eliminatedUsers.includes(
                data.possibilites.indexOf(personnage)
              ) &&
              !qualites.includes(personnage[attribut])
            ) {
              qualites.push(personnage[attribut]);
            }
          });

          return qualites;
        };

        if (!props.attribut)
          return (
            <Form.Select name="qualite" className="button">
              <option>Qualités</option>
            </Form.Select>
          );

        return (
          <Form.Select name="qualite" className="button">
            {filterQualities(props.attribut).map((q) => (
              <option value={q}>{q}</option>
            ))}
          </Form.Select>
        );
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Title />
      <HomePage />
      <PopUp />
    </div>
  );
}

export default App;
