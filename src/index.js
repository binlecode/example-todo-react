import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.css";
import reportWebVitals from "./reportWebVitals";

import TodoApp from "./components/TodoApp";

ReactDOM.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
