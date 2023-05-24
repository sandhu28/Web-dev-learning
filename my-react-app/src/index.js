import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import add, { multiply, subtract, divide } from "./calculator"

// ReactDOM.render(
//     <App />,
//     document.getElementById("root")
// );

ReactDOM.render(
    <ul>
        <li>{add(1, 2)}</li>
        <li>{multiply(2, 3)}</li>
        <li>{subtract(7, 2)}</li>
        <li>{divide(5, 2)}</li>
    </ul>,
    document.getElementById("root")
);