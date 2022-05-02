import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminTable from "../components/AdminTable";

const AdminForm = () => {
  // useState function to initialize the piece of state stored in translations with the array of translataion values passed in the props:
  const [translations, setTranslations] = useState([]);

  const [newTranslation, setNewTranslation] = useState({
    english: "",
    finnish: "",
    tag: "",
  });

  //useEffect hooks fetches data using axios
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:8080/translations").then((response) => {
      console.log("promise fulfilled");
      //initialise the data in the translations array
      setTranslations(response.data);
    });
  }, []);
  console.log("render", translations.length, "translations");

  // event handlers

  const handleAddTranslationChange = (event) => {
    event.preventDefault();
    // gets the name attrribute of the field the user is typing into
    const fieldName = event.target.getAttribute("name");
    // gets the input typed into the field
    const fieldValue = event.target.value;
    // make a copy of the newTranslation object so its state is not mutated
    // copy the newTranslation data using the spread operator to extra the data
    const newTranslationCopy = { ...newTranslation };
    // assign the relevant values to each key
    newTranslationCopy[fieldName] = fieldValue;
    // update the state of newTranslation
    setNewTranslation(newTranslationCopy);
  };

  const addTranslation = (event) => {
    event.preventDefault();
    //stops page reload and other unwanted default behaviour
    const translationObject = {
      english: newTranslation.english,
      finnish: newTranslation.finnish,
      tag_id: newTranslation.tag,
    };
    axios
      .post("http://localhost:8080/translations/add", translationObject, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setTranslations(translations.concat(response.data));
        console.log(response.data);
        // clear form fields
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
        setNewTranslation({
          newTranslation: { english: "", finnish: "", tag: "" },
        });
      });
  };

  return (
    <>
      <form className="input-form" onSubmit={addTranslation}>
        <label>
          English word:{" "}
          <input
            type="text"
            name="english"
            required="required"
            placeholder="Enter the English word"
            pattern="[a-zA-Z]*"
            title="The word should have only letters"
            onChange={handleAddTranslationChange}
          />
        </label>

        <label>
          Finnish word:{" "}
          <input
            type="text"
            name="finnish"
            required="required"
            placeholder="Finnish translation"
            pattern="[a-zA-ZäöåÄÖÅ]*"
            title="The word should have only letters"
            onChange={handleAddTranslationChange}
          />
        </label>
        <label>
          Tag:{" "}
          <input
            type="text"
            name="tag"
            required="required"
            placeholder="Tag"
            pattern="[a-zA-ZäöåÄÖÅ]*"
            title="The word should have only letters"
            onChange={handleAddTranslationChange}
          />
        </label>

        <button className="input-button" stype="submit">
          Save
        </button>
      </form>

      <h2>Translations</h2>

      <AdminTable translations={translations} />
    </>
  );
};

export default AdminForm;
