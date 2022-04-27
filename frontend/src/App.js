import "./App.css";
import { Outlet, Link } from "react-router-dom";
const App = () => {
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          padding: "1rem",
          backgroundColor: "#03a9f4",
          fontSize: "2rem",
          textAlign: "center",
          paddingBottom: "1rem",
          marginBottom: "3rem",
          fontFamily: "Tahoma, Verdana, Segoe, sans-serif",
        }}
      >
        <Link to="/">home</Link> | <Link to="/admin">Parent admin</Link> |{" "}
      </nav>

      <Outlet />
    </div>
  );
};
//Out

//Out
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminTable from "./component/AdminTable";
// // import AdminForm from "./component/AdminForm";
// const App = () => {
//   // useState function to initialize the piece of state stored in translations with the array of translataion values passed in the props:
//   const [translations, setTranslations] = useState([]);
//   const [newEnglish, setNewEnglish] = useState("");
//   const [newFinnish, setNewFinnish] = useState("");
//   const [newTag, setNewTag] = useState("");

//   //useEffect hooks fetches data using axios
//   useEffect(() => {
//     console.log("effect");
//     axios.get("http://localhost:8080/translations").then((response) => {
//       console.log("promise fulfilled");
//       //initialise the data in the translations array
//       setTranslations(response.data);
//     });
//   }, []);
//   console.log("render", translations.length, "translations");

//   // event handlers

//   const addTranslation = (event) => {
//     event.preventDefault();
//     //stops page reload and other unwanted default behaviour
//     const translationObject = {
//       english: newEnglish,
//       finnish: newFinnish,
//       tag_id: newTag,
//     };
//     axios
//       .post("http://localhost:8080/translations/add", translationObject, {
//         headers: {
//           "content-type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         setTranslations(translations.concat(response.data));
//         setNewEnglish("");
//         setNewFinnish("");
//         setNewTag("");
//       });
//   };

//   const handleEnglishChange = (event) => {
//     console.log(event.target.value);
//     setNewEnglish(event.target.value);
//   };

//   const handleFinnishChange = (event) => {
//     console.log(event.target.value);
//     setNewFinnish(event.target.value);
//   };

//   const handleTagChange = (event) => {
//     console.log(event.target.value);
//     setNewTag(event.target.value);
//   };

//   return (
//     <div className="container">
//       <div className="box">
//         <h1>Learn Languages App</h1>
//         {/* <AdminForm /> */}
//         <form className="input-form" onSubmit={addTranslation}>
//           <label>
//             English word:{" "}
//             <input
//               type="text"
//               name="english"
//               required="required"
//               placeholder="Enter the English word"
//               pattern="[a-zA-Z]*"
//               title="The word should have only letters"
//               value={newEnglish}
//               onChange={handleEnglishChange}
//             />
//           </label>

//           <label>
//             Finnish word:{" "}
//             <input
//               type="text"
//               name="finnish"
//               required="required"
//               placeholder="Finnish translation"
//               pattern="[a-zA-ZäöåÄÖÅ]*"
//               title="The word should have only letters"
//               value={newFinnish}
//               onChange={handleFinnishChange}
//             />
//           </label>
//           <label>
//             Tag:{" "}
//             <input
//               type="text"
//               name="tag"
//               required="required"
//               placeholder="Tag"
//               pattern="[a-zA-ZäöåÄÖÅ]*"
//               title="The word should have only letters"
//               value={newTag}
//               onChange={handleTagChange}
//             />
//           </label>

//           <button className="input-button" stype="submit">
//             Save
//           </button>
//         </form>
//         <h2>Translations</h2>
//         <AdminTable translations={translations} />
//       </div>
//     </div>
//   );
// };

export default App;
