import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Translation from "./component/Translation";

const App = () => {
  // useState function to initialize the piece of state stored in birds with the array of birds passed in the props:
  const [translations, setTranslations] = useState([]);

  //useEffect hooks fetches data using axios
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:8080/translations").then((response) => {
      console.log("promise fulfilled");
      setTranslations(response.data);
    });
  }, []);
  console.log("render", translations.length, "translations");

  // event handlers

  return (
    <div className="container">
      <div className="box">
        <h1>Learn Languages App</h1>

        <h2>Translations</h2>
        <ul>
          {translations.map((translation) => (
            <Translation key={translation.id} translation={translation} />
          ))}
        </ul>
      </div>
    </div>
  );
};

// class App extends React.Component {
//   state = { translations: [] };
//   async componentDidMount() {
//     let response = await axios.get("http://localhost:8080/translations");
//     this.setState({
//       translations: response.data,
//     });
//   }

//   render() {
//     if (this.state.translations.length === 0) {
//       return <p>loading...</p>;
//     } else {
//       let ui = this.state.translations.map((translation) => (
//         <li key={translation.id}>
//           {translation.id} - {translation.english} - {translation.finnish} -{" "}
//           {translation.category}
//         </li>
//       ));
//       console.log(ui);
//       return <ul>{ui}</ul>;
//     }
//   }
// }

export default App;
