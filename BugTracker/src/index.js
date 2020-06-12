import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./material-dashboard.css";
import Context from "./Context";

//JS
import "material-dashboard/assets/js/material-dashboard.js";
import "material-dashboard/assets/js/core/bootstrap-material-design.min.js";

ReactDOM.render(
  <Context.Provider>
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
