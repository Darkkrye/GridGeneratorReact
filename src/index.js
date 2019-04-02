import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import LayoutManagerComponent from "./Layout/LayoutManagerComponent";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <br />
      <LayoutManagerComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
