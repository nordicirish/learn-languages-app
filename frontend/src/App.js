import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Translation from "./component/Translation";

const App = () => {
  // useState function to initialize the piece of state stored in translations with the array of translataion values passed in the props:
  const [translations, setTranslations] = useState([]);
  const [newEnglish, setNewEnglish] = useState("english...");
  const [newFinnish, setNewFinnish] = useState("finnish...");
  const [newCategory, setNewCategory] = useState(1);

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
  const addTranslation = (event) => {
    event.preventDefault();
    //stops page reload and other unwanted default behaviour
    const translationObject = {
      english: newEnglish,
      finnish: newFinnish,
      tag_id: newCategory,
    };
    const test = {
      english: "dd",
      finnish: "AA",
      tag_id: 5,
    };

    axios
      .post("http://localhost:8080/translations/add", test, {
        headers: {
          "content-type": "application/json",
        },
      })
      // .post("http://localhost:8080/translations/add", translationObject)
      .then((response) => {
        console.log(response);
        setTranslations(translations.concat(response.data));
        setNewEnglish("");
        setNewFinnish("");
        setNewCategory(1);
      });
  };

  const handleEnglishChange = (event) => {
    console.log(event.target.value);
    setNewEnglish(event.target.value);
  };

  const handleFinnishChange = (event) => {
    console.log(event.target.value);
    setNewFinnish(event.target.value);
  };

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setNewCategory(event.target.value);
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Learn Languages App</h1>
        <form className="input-form" onSubmit={addTranslation}>
          <label>
            Enter the English word:{" "}
            <input value={newEnglish} onChange={handleEnglishChange} />
          </label>

          <label>
            Enter the Finnish word:{" "}
            <input value={newFinnish} onChange={handleFinnishChange} />
          </label>
          <label>
            Enter the tag:{" "}
            <input value={newCategory} onChange={handleCategoryChange} />
          </label>

          <button className="input-button" stype="submit">
            Save
          </button>
        </form>
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
