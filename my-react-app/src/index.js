import React from "react";
import ReactDOM from "react-dom";

const customStyle = {
    color: "red",
}

function cL(toLog) {
    console.log(toLog);
}

const currDate = new Date(2023, 4, 30, 119);
cL(currDate);
var hour = currDate.getHours();
cL(hour);

let greeting = "";

if (hour >= 0 && hour < 12) {
    greeting = "Good Morning!";
    customStyle.color = "red";
}
else if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon!";
    customStyle.color = "green";
}
else {
    greeting = "Good Night!";
    customStyle.color = "blue";
}

ReactDOM.render(

    <div>
        <h1 className="heading" style={customStyle} >{greeting}</h1>
    </div>
    ,
    document.getElementById('root')
);


// function MyComponent() {
//     const name = 'Sukhman';
//     const showGreeting = true;

//     return (
//         <div>
//             {showGreeting && <h1>Hello, {name}!</h1>}
//             {name.length > 5 ? <p>Your name is long.</p> : <p>Your name is short.</p>}
//         </div>
//     );
// }

// ReactDOM.render(
//     <MyComponent />,
//     document.getElementById('root')
// );