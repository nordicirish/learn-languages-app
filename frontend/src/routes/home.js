import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminTable from "../components/AdminTable";

const Home = () => {
  // useState function to initialize the piece of state stored in translations with the array of translataion values passed in the props:
  // const [translations, setTranslations] = useState([]);
  // const [newEnglish, setNewEnglish] = useState("");
  // const [newFinnish, setNewFinnish] = useState("");
  // const [newTag, setNewTag] = useState("");

  // //useEffect hooks fetches data using axios
  // useEffect(() => {
  //   console.log("effect");
  //   axios.get("http://localhost:8080/translations").then((response) => {
  //     console.log("promise fulfilled");
  //     //initialise the data in the translations array
  //     setTranslations(response.data);
  //   });
  // }, []);
  // console.log("render", translations.length, "translations");

  // // event handlers

  // const addTranslation = (event) => {
  //   event.preventDefault();
  //   //stops page reload and other unwanted default behaviour
  //   const translationObject = {
  //     english: newEnglish,
  //     finnish: newFinnish,
  //     tag_id: newTag,
  //   };
  //   axios
  //     .post("http://localhost:8080/translations/add", translationObject, {
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setTranslations(translations.concat(response.data));
  //       setNewEnglish("");
  //       setNewFinnish("");
  //       setNewTag("");
  //     });
  // };

  // const handleEnglishChange = (event) => {
  //   console.log(event.target.value);
  //   setNewEnglish(event.target.value);
  // };

  // const handleFinnishChange = (event) => {
  //   console.log(event.target.value);
  //   setNewFinnish(event.target.value);
  // };

  // const handleTagChange = (event) => {
  //   console.log(event.target.value);
  //   setNewTag(event.target.value);
  // };

  return (
    <div className="container">
      <div className="box">
        <h1>Learn Languages App</h1>
        <h2>Coming soon...</h2>
      </div>
    </div>
  );
};

export default Home;
