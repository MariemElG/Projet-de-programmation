"use strict";

import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import data from "../config.json";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";

const chosenPerson =
  data.possibilites[Math.floor(Math.random() * data.possibilites.length)];

const HomePage = () => {
  const [buttonpopUp, setButtonpopUp] = useState(false);
  const [buttonpopUp1, setButtonpopUp1] = useState(false);
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
              onClick={() => {
                setButtonpopUp1(true);
              }}
            >
              Generator
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
        <Board />
      </PopUp>
      <PopUp trigger={buttonpopUp1} setTrigger={setButtonpopUp1}>
        {" "}
        <Generator />
      </PopUp>
    </div>
  );
};

function Title(props) {
  return (
    <h1 className="Title">
      {" "}
      <span className="guess"> Guess</span> Who?{" "}
    </h1>
  );
}
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
  const [questions, setQuestions] = useState([]);
  const [mistakeNumber, setMistakeNumber] = useState(0);

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
              setMistakeNumber={setMistakeNumber} // why did he add mistake number and question
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
          if (props.name == chosenPerson["prenom"]) {
            alert(
              "C'est moi ! T'as posé " +
                (props.mistakeNumber * 3 + props.questions.length) +
                " questions."
            );
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

    return (
      <form className="Menu" onSubmit={(event) => handleSubmit(event)}>
        <div>
          <AttributeSelector />
        </div>
        <Button type="submit" variant="light" className="button">
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
const Generator = () => {
  const [nombrePersonnage, setNombrePersonnage] = useState(0);
  const [buttonpopUpAjouter, setButtonpopUpAjouter] = useState(false);
  const [buttonpopUpListe, setButtonpopUpListe] = useState(false);

  return (
    <div>
      <h1 className="titles">Generator</h1>
      <UpperMenu />
      <Table />
      <PopUpSmall
        trigger={buttonpopUpAjouter}
        setTrigger={setButtonpopUpAjouter}
      >
        <AjouterPersonnage />
      </PopUpSmall>
      <PopUpSmall trigger={buttonpopUpListe} setTrigger={setButtonpopUpListe}>
        <ListeAttributs />
      </PopUpSmall>
    </div>
  );

  function AjouterPersonnage(props) {
    return (
      <div>
        <h1 className="titles">Ajouter une personnage</h1>
        <br />
        <Button className="buttonYellow" onClick={() => alert("Not ready yet")}>
          Choisir une photo
        </Button>
        {Object.keys(data.possibilites[0]).map((key) => {
          if (key != "fichier") {
            return (
              <div className="attributs">
                <div>
                  <label htmlFor={key} className="property">
                    <span className="AjouterSpan">{key} :</span>
                  </label>
                  <input
                    type="text"
                    id={key}
                    className="buttonYellow value"
                    value="qualité"
                    required="required"
                  />
                </div>
              </div>
            );
          }
        })}
        <Button type="submit" variant="light" className="buttonYellow">
          Valider
        </Button>{" "}
      </div>
    );
  }

  function ListeAttributs(props) {
    return (
      <div>
        <h1 className="titles">Liste Des Attributs</h1>
        <br />
      </div>
    );
  }
  function PopUpSmall(props) {
    return props.trigger ? (
      <div className="PopUp PopUpSmall">
        <div className="PopUp-inner PopUp-innerSmall">
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
  function UpperMenu(props) {
    return (
      <div>
        <div className="Menu">
          <div>
            <div>
              <label htmlFor="NombrePersonnages">
                {" "}
                Nombre de Personnages :
              </label>
              <input
                type="text"
                className="button"
                id="NombrePersonnages"
                value={nombrePersonnage}
                disabled
                onInput={(e) => setNombrePersonnage(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="button"
            onClick={() => setButtonpopUpAjouter(true)}
          >
            Ajouter Une Personnage
          </Button>
          <Button className="button" onClick={() => setButtonpopUpListe(true)}>
            Liste des Attributs
          </Button>{" "}
        </div>
      </div>
    );
  }
  function Table(params) {
    setNombrePersonnage(data.possibilites.length);
    return data.possibilites.map((p) => {
      return (
        <Personnage1
          name={p.prenom}
          src={"/" + data.locationImages + p.fichier}
        />
      );
    });

    function Personnage1(props) {
      return (
        <img
          className="Personnage"
          src={props.src}
          alt={props.name}
          onClick={() => {
            alert(props.name + "!");
          }}
        />
      );
    }
  }
};
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
