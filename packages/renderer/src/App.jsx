import { useState, useEffect } from "react";
import data from "@/config.json";

import dataGen from "@/configGen.json";
import dataOG from "@/configOG.json"

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "@/styles/App.css";

import Countdown from 'react-countdown';

const savedGame = localStorage.getItem("session");

// This is a crime
let pInQuestion;

const chosenPerson = savedGame
  ? JSON.parse(savedGame).chosenPerson
  : data.possibilites[Math.floor(Math.random() * data.possibilites.length)];

console.log(chosenPerson);

const HomePage = () => {
  const [buttonpopUp, setButtonpopUp] = useState(false);
  const [buttonpopUp0, setButtonpopUp0] = useState(false);
  const [buttonpopUp1, setButtonpopUp1] = useState(false);
  const [buttonpopUp2, setButtonpopUp2] = useState(false);

  if (savedGame) {
    const savedGameData = JSON.parse(savedGame);

    return (
      <div className="homePage">
        <div className="buttonList">
          <ul>
            <li>
              <button
                className="button"
                type="button"
                onClick={() => {
                  setButtonpopUp(true);
                }}
              >
                Single-player
              </button>
            </li>
            <li>
              <button
                className="button"
                type="button"
                onClick={() => {
                  setButtonpopUp0(true);
                }}
              >
                Single-player Against AI
              </button>
            </li>
            <li>
              <br />
              <button
                className="button"
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
                className="button"
                type="button"
                onClick={() => {
                  setButtonpopUp2(true);
                }}
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
        <PopUp trigger={buttonpopUp0} setTrigger={setButtonpopUp0}>
          {" "}
          <Board savedGameData={savedGameData} ai={true} />
        </PopUp>
        <PopUp trigger={buttonpopUp1} setTrigger={setButtonpopUp1}>
          {" "}
          <Generator />
        </PopUp>
        <PopUp trigger={buttonpopUp2} setTrigger={setButtonpopUp2}>
          {" "}
          <WhatIsIt />
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
              className="button"
              type="button"
              onClick={() => {
                setButtonpopUp(true);
              }}
            >
              Single-player
            </button>
          </li>
          <li>
            <button
              className="button"
              type="button"
              onClick={() => {
                setButtonpopUp0(true);
              }}
            >
              Single-player Against AI
            </button>
          </li>
          <li>
            <br />
            <button
              className="button"
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
              className="button"
              type="button"
              onClick={() => {
                setButtonpopUp2(true);
              }}
            >
              What is Guess Who?
            </button>
          </li>
        </ul>
        <br></br>
      </div>
      <PopUp trigger={buttonpopUp} setTrigger={setButtonpopUp}>
        {" "}
        <Board savedGameData={{ questions: [], questionsAI: [] }} />
      </PopUp>
      <PopUp trigger={buttonpopUp0} setTrigger={setButtonpopUp0}>
        {" "}
        <Board savedGameData={{ questions: [], questionsAI: [] }} ai={true} />
      </PopUp>
      <PopUp trigger={buttonpopUp1} setTrigger={setButtonpopUp1}>
        {" "}
        <Generator />
      </PopUp>
      <PopUp trigger={buttonpopUp2} setTrigger={setButtonpopUp2}>
        {" "}
        <WhatIsIt />
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
    <div></div>
  );
}

function WhatIsIt(props) {
  return (
    <div className="WhatIsIt">
      <h4 className="lineUnder ">OBJECT OF THE GAME</h4>
      Your object is to guess the mystery person on your opponent’s card by
      asking one question per turn, and eliminating any faces that don’t fit the
      mystery person’s description. Guess your opponent’s mystery person before
      your opponent guesses yours and you win!
      <h4 className="lineUnder ">CONTENTS</h4>2 plastic gameboard units, 24
      mystery cards, 48 face cards and face frames, 2 score keepers
      <h4 className="lineUnder ">SET UP (The First Time You Play)</h4>
      1. Gently detach the 48 face cards from the sheet. 2. The red player takes
      the red face cards and slides them into the face frames on his gameboard.
      The blue player does the same with the blue face cards. It doesn’t matter
      which face card goes into each frame on the gameboard.
      <h4 className="lineUnder ">GAMEPLAY</h4>
      Each player chooses a gameboard. Place your gameboard on a flat surface.
      Flip all of your frames upright by tipping your gameboard away from you;
      then set your gameboard flat again. Your opponent does the same.
      <h4 className="lineUnder ">Draw Your Mystery Card</h4>
      Shuffle the mystery cards. Choose one card at random and fit it into your
      mystery card slot so that your mystery person faces you. Your opponent
      does the same. Then place all unused mystery cards face down out of play.
      Sit facing your opponent, so that he or she can’t see the mystery per- son
      on your card!
      <h4 className="lineUnder ">The Gameboard Faces</h4>
      Notice the differences among the 24 faces on your gameboard. Hair and eye
      colors are different; some faces have beards, mustaches or big noses; some
      are wearing hats or glasses. As you play, you’ll notice several other
      differences among the faces.
      <h4 className="lineUnder ">Your Turn</h4>
      The youngest player always goes first. On your turn, you may either ask a
      question, or guess who the mystery person is. But don’t use your turn to
      guess the mystery person until you’re ready. If your guess is wrong,
      you’ll lose the game! Rules for asking questions and guessing the mystery
      person are explained below.
    </div>
  );
}

function Board(props) {
  const [questions, setQuestions] = useState(props.savedGameData.questions);
  const [questionsAI, setQuestionsAI] = useState(props.savedGameData.questionsAI);


  const eliminatedUsers = [];
  data.possibilites.forEach((p) => {
    questions.forEach((q) => {
      if ((p[q[0]] === q[1]) !== q[2] && (!eliminatedUsers.includes(data.possibilites.indexOf(p))))
        eliminatedUsers.push(data.possibilites.indexOf(p));
    });
  });

  const eliminatedUsersByAI = [];
  data.possibilites.forEach((p) => {
    questionsAI.forEach((q) => {
      if ((p[q[0]] === q[1]) !== q[2] && (!eliminatedUsersByAI.includes(data.possibilites.indexOf(p))))
        eliminatedUsersByAI.push(data.possibilites.indexOf(p));
    });
  });

  useEffect(() => {
    if (eliminatedUsers.length === data.possibilites.length - 1) {
      alert(`T'as gagné ! T'as demandé ${questions.length} question(s) !`)
      localStorage.removeItem("session");
      window.location.reload(false);
    }
  }, [eliminatedUsers])

  useEffect(() => {
    if (eliminatedUsersByAI.length === data.possibilites.length - 1 && eliminatedUsers.length !== data.possibilites.length - 1) {
      alert(`T'as perdu ! IA a demandé ${questionsAI.length} question(s) ! `)
      localStorage.removeItem("session");
      window.location.reload(false);
    }
  }, [eliminatedUsersByAI])

  if (props.ai && (questions.length > questionsAI.length)) {
    const attributess = []
    Object.keys(data.possibilites[0]).forEach((key) => {
      if (key != "fichier") attributess.push(key);
    })

    let chosenAttributByAI = attributess[Math.floor(Math.random() * attributess.length)]
    const filterQualities = (attribut) => {
      const qualites = [];

      data.possibilites.forEach((personnage) => {
        if (
          !eliminatedUsersByAI.includes(
            data.possibilites.indexOf(personnage)
          ) &&
          !qualites.includes(personnage[attribut])
        ) {
          qualites.push(personnage[attribut]);
        }
      });

      return qualites;
    };
    let qualitiesAI = filterQualities(chosenAttributByAI);

    while (qualitiesAI.length === 1) {
      chosenAttributByAI = attributess[Math.floor(Math.random() * attributess.length)]
      qualitiesAI = filterQualities(chosenAttributByAI);
    }

    const qualiteQuestionAI = qualitiesAI[Math.floor(Math.random() * qualitiesAI.length)]


    setQuestionsAI((prevQuestions) => [
      ...prevQuestions,
      [
        chosenAttributByAI,
        qualiteQuestionAI,
        qualiteQuestionAI ===
        chosenPerson[chosenAttributByAI],
      ],
    ]);
  }

  return (
    <div>
      {data.possibilites.map((p) => {
        let eliminatedByAI = eliminatedUsersByAI.includes(data.possibilites.indexOf(p))
        if (questions.length > 1) eliminatedByAI = false

        if (eliminatedUsers.includes(data.possibilites.indexOf(p))) {
          return (
            <span className="PersonnageElimine">
              <Personnage
                name={p.prenom}
                src={"imageSets/no.jpeg"}
                questions={questions}
                setQuestions={setQuestions}
                objet={p}
                rip={true}
                eliminatedByAI={eliminatedByAI}
              />
            </span>
          );
        } else {
          return (
            <Personnage
              name={p.prenom}
              src={"/" + data.locationImages + p.fichier}
              questions={questions}
              objet={p}
              eliminatedByAI={eliminatedByAI}
            />
          );
        }
      })}

      <Menu
        questions={questions}
        setQuestions={setQuestions}
        questionsAI={questionsAI}
      />
    </div>
  );

  function Personnage(props) {
    if (props.eliminatedByAI) {
      return (
        <img
          className="PersonnageEByAI"
          src={props.src}
          alt={props.name}
        />
      );
    }

    return (
      <img
        className="Personnage"
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
      localStorage.setItem(
        "session",
        JSON.stringify({
          chosenPerson,
          questions: props.questions,
          questionsAI: props.questionsAI,
        })
      );
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
        <Button
          onClick={() => handleSaveClick()}
          variant="light"
          className="button"
        >
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

const Generator = () => {
  const [nombrePersonnage, setNombrePersonnage] = useState(0);
  const [buttonpopUpAjouter, setButtonpopUpAjouter] = useState(false);
  const [imagesExists, setImagesExists] = useState(false);
  const [buttonpopUpAttribut, setButtonpopUpAttribut] = useState(false);
  const [buttonpopUpImages, setButtonpopUpImages] = useState(false);

  return (
    <div>
      <h1 className="titles">Generator</h1>
      <UpperMenu />
      <Table />
      <PopUpSmall
        trigger={buttonpopUpAjouter}
        setTrigger={setButtonpopUpAjouter}
      >
        <ModifierPersonnage />
      </PopUpSmall>
      <PopUpSmall
        trigger={buttonpopUpAttribut}
        setTrigger={setButtonpopUpAttribut}
      >
        <AjouterAttribut />
      </PopUpSmall>
      <PopUpSmall trigger={buttonpopUpImages} setTrigger={setButtonpopUpImages}>
        <ChoisirImages />
      </PopUpSmall>
      <ValiderConfig />
    </div>
  );

  function ModifierPersonnage(props) {
    function handleSubmit(event) {
      event.preventDefault();

      let testPassed = true;
      Object.keys(dataGen.possibilites[0]).map((key) => {
        if (key !== "fichier") {
          if (!event.target[key].value) testPassed = false;
        }
      });

      if (!testPassed) return alert("Remplir tous les attributs !");

      if (pInQuestion === 0 || pInQuestion >= 0) {
        Object.keys(dataGen.possibilites[0]).map((key) => {
          if (key !== "fichier") {
            dataGen.possibilites[pInQuestion][key] = event.target[key].value;
          }
        });

        window.fs.writeFileSync(
          "./packages/renderer/src/configGen.json",
          JSON.stringify(dataGen)
        );

        setButtonpopUpAjouter(false);
      }
    }

    return (
      <div>
        <h1 className="titles">Modifier Une Personnage</h1>
        <br />
        <form onSubmit={handleSubmit}>
          {Object.keys(dataGen.possibilites[0]).map((key) => {
            if (
              key != "fichier" &&
              dataGen.possibilites[pInQuestion][key] === undefined
            ) {
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
                      placeholder="Qualite"
                    />
                  </div>
                </div>
              );
            } else if (key != "fichier") {
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
                      defaultValue={dataGen.possibilites[pInQuestion][key]}
                    />
                  </div>
                </div>
              );
            }
          })}
          <Button type="submit" variant="light" className="buttonYellow">
            Valider
          </Button>{" "}
        </form>
      </div>
    );
  }

  function AjouterAttribut(props) {
    function handleSubmit(event) {
      event.preventDefault();
      if (!imagesExists)
        return alert("Choisir les images avant d'ajouter un attribut");

      if (event.target.attributAdder.value) {
        dataGen.possibilites.forEach((p) => {
          p[event.target.attributAdder.value] = "";
        });

        window.fs.writeFileSync(
          "./packages/renderer/src/configGen.json",
          JSON.stringify(dataGen)
        );

        setButtonpopUpAttribut(false);
      }
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1 className="titles">Ajouter Un Attribut</h1>
          <input
            id="attributAdder"
            type="text"
            className="button"
            placeholder="Attribut"
          ></input>
          <input type="submit" className="button" placeholder=""></input>
        </form>
      </div>
    );
  }

  function ChoisirImages(props) {
    return (
      <div>
        <h1 className="titles">Choisir des Images</h1>

        <Button
          type="submit"
          className="buttonYellow"
          onClick={async () => {
            const dialogConfig = {
              title: "Choisir un dossier !",
              buttonLabel: "Ça marche !",
              properties: ["openDirectory"],
            };

            const directoryObject = await window.dialog.openDialog(
              "showOpenDialog",
              dialogConfig
            );

            if (!directoryObject.canceled) {
              const directory = directoryObject.filePaths[0];
              const folderName = directory.substring(
                directory.lastIndexOf("/") + 1
              );

              const configData = {
                locationImages: "imageSets/" + folderName + "/",
                possibilites: [],
              };

              if (window.fs.readdirSync(directory).length > 0) {
                const imageSetsLocation =
                  "./packages/renderer/public/imageSets/";

                if (!window.fs.existsSync(imageSetsLocation + folderName))
                  window.fs.mkdirSync(imageSetsLocation + folderName);

                window.fs.readdirSync(directory).forEach((file) => {
                  if (
                    window.path.extname(file) === ".png" ||
                    window.path.extname(file) === ".jpg" ||
                    window.path.extname(file) === ".jpeg"
                  ) {
                    window.fs.copyFileSync(
                      directory + "/" + file,
                      imageSetsLocation + folderName + "/" + file
                    );

                    configData.possibilites.push({ fichier: file });

                  }
                });

                window.fs.writeFileSync(
                  "./packages/renderer/src/configGen.json",
                  JSON.stringify(configData)
                );
              }

              setButtonpopUpImages(false);
              setImagesExists(true);
            }
          }}
        >
          Choisir Un Dossier
        </Button>
      </div>
    );
  }

  function ValiderConfig(props) {
    function handleOnClick() {
      if (Object.keys(dataGen.possibilites[0]).length < 2) return alert("Ajouter au moins un attribut !")
      let isDone = true;
      dataGen.possibilites.forEach((p) => {
        Object.keys(p).forEach((k) => {
          if (p[k] === "") isDone = false;
        });
      });

      if (!isDone) return alert("Remplir tous les attributs ! ");

      window.fs.writeFileSync(
        "./packages/renderer/src/config.json",
        JSON.stringify(dataGen)
      );
      localStorage.removeItem("session");
      window.location.reload(false);
    }

    return (
      <div>
        <Button type="submit" className="buttonYellow" onClick={handleOnClick}>
          Valider La Configuration
        </Button>
        <Button className="buttonYellow" onClick={async () => {
          window.fs.writeFileSync(
            "./packages/renderer/src/configGen.json",
            JSON.stringify(dataOG)
          );

          setImagesExists(true);
        }}>
          Reset Game
        </Button>
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
              { }
              <input
                type="text"
                className="button"
                id="NombrePersonnages"
                defaultValue={(() => {
                  if (imagesExists) {
                    return nombrePersonnage;
                  } else {
                    return 0;
                  }
                })()}
                onChange={(e) => setNombrePersonnage()}
              />
            </div>
          </div>
          <Button
            className="button"
            onClick={() => setButtonpopUpAttribut(true)}
          >
            Ajouter Un Attribut
          </Button>
          <Button className="button" onClick={() => setButtonpopUpImages(true)}>
            Choisir des Images
          </Button>
        </div>
      </div>
    );
  }
  function Table(params) {
    const isEmpty = Object.keys(dataGen).length === 0;
    if (isEmpty) {
      dataGen.locationImages = "imageSets/tests/";
      dataGen.possibilites = [];
    }

    setNombrePersonnage(dataGen.possibilites.length);
    if (!imagesExists) {
      return data.possibilites.map((p) => {
        return (
          <PersonnageNone
            id={data.possibilites.indexOf(p)}
            src={"imageSets/question.jpeg"}
          />
        );
      });
    } else {
      return dataGen.possibilites.map((p) => {
        return (
          <Personnage1
            id={dataGen.possibilites.indexOf(p)}
            src={"/" + dataGen.locationImages + p.fichier}
          />
        );
      });
    }
    function PersonnageNone(props) {
      return <img className="Personnage" src={props.src} />;
    }
    function Personnage1(props) {
      return (
        <img
          className="Personnage"
          src={props.src}
          onClick={() => {
            pInQuestion = props.id;
            setButtonpopUpAjouter(true);
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
