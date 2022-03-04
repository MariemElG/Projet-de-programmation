import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="nameGame">Guiss Who ???!!!!!!!</div>

      <div className="buttonList">
        <h3 className="welcome">
          {" "}
          Welcome to the game, please choose one of the buttons :
        </h3>
        <Button href="" className="btn" variant="outline-primary">
          Single player
        </Button>{" "}
        <br></br>
        <Button href="" className="btn" variant="outline-primary">
          Multi player
        </Button>{" "}
        <br></br>
        <Button
          as="a"
          href="/src/more.html"
          className="btn"
          variant="outline-primary"
        >
          More about the Game
        </Button>{" "}
        <br></br>
      </div>
    </div>
  );
};

export default HomePage;
