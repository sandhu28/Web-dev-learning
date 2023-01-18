function MainContent() {
  return (<h1>I'm Learning REACT JS</h1>)
}

// ReactDOM.render(
//   <ul>
//     <li>item 1</li>
//     <li>item 2</li>
//     <div>
//       <mainContent/>
//     </div>
//   </ul>,
//   document.getElementById("root")
// );

// ReactDOM.render(
//   <div >
//     <MainContent/>
//   </div>,
//   document.getElementById('root')
// );

// const h1 = document.createElement("h1");
// h1.textContent = "This is an imperative way to program";
// h1.className = "header";
// document.getElementById("root").append(h1);

// ReactDOM.render(
//   <h1 className="header">This is an imperative way to program</h1>,
//   document.getElementById("root")
// );

// function Nav() {
//   return (
//     <div>
//       <h1>React Info</h1>
//       <ul>
//         <li>Pricing</li>
//         <li>About</li>
//         <li>Contact</li>
//       </ul>
//     </div>
//   )
// }

// const navbar = (
//   <nav>
//     <h1>Sandhu's Dhaba</h1>
//     <ul>
//       <li>Menu</li>
//       <li>About</li>
//       <li>Contact</li>
//     </ul>
//   </nav>
// )

// ReactDOM.render(
//   navbar,
//   document.getElementById("root")
// );

const test = (
  <div>
    <h1>SANDHU</h1>
    <p>My hobby is to play badminton and study</p>
    <h2>React is a cool language</h2>
    <button>I am loving React</button>
  </div>
)



// const see = document.getElementById('root').append(test);
// console.log(test);

ReactDOM.render(
  test,
  document.getElementById('root')
);
