// const page = (
//     <div>
//         <img src="./React_logo.png" width = "100px"></img>
//         <h1>Fun facts about React</h1>
//         <ul>
//             <li>Was first released in 2013</li>
//             <li>Was originally created by Jordan Walke </li>
//             <li>Has well over 100K stars on GitHub</li>
//             <li>It is maintained by Facebook</li>
//             <li>Powers thousands of enterprise apps, including mobile apps</li>
//         </ul>
//     </div>
// )

import Header from "./Header.js";
import Footer from "./Footer.js";
import MainContent from "./MainContent.js";

function Page() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

ReactDOM.render(<Page />, document.getElementById("root"));
