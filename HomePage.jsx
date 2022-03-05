import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="buttonList">
        <ul>
          <li>
            <button class="button" type="button" onclick={Board}>
              Single-player
            </button>
          </li>
          <li>
            <br />
            <button class="button" type="button" onclick={Board}>
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
              What is Guiss Who?
            </button>
          </li>
        </ul>
        <br></br>
      </div>
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

export default HomePage;
