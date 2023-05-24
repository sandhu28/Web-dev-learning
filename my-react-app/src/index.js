import React from "react";
import ReactDOM from "react-dom";

const img = "https://picsum.photos/400";

ReactDOM.render(

    <div>
        <h1 className="heading">Hello World!</h1>
        <img alt="random img" src={img + "?grayscale"}></img>
    </div>
    ,
    document.getElementById('root'));