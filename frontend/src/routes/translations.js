import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import AdminTable from "../components/AdminTable";
import SubmitForm from "../components/SubmitForm";

// "proxy": "http://localhost:8080" in package.json allows short urls

// import "bootstrap/dist/css/bootstrap.min.css";

const Translations = () => {
  const [translations, setTranslations] = useState([]);
  // used to display the delete modal form
  // const [show, setShow] = useState(false);
  // newTranslation object used by SubmitForm component to post a new item
  // initialise newTranslation state
  const [newTranslation, setNewTranslation] = useState({
    english: "",
    finnish: "",
    tag_id: "",
  });
  // initialise the state of the tags array
  const [tags, setTags] = useState([]);

  // On Page load fetch all records via the api
  const getTranslations = () => {
    axios
      .get("/api/all")
      .then((response) => {
        console.log("promise fulfilled");
        setTranslations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect - getTranslations runs once on page load
  useEffect(() => {
    getTranslations();
  }, []);
  // fetch all tags via the api
  const getTags = () => {
    axios
      .get("/api/Tags")
      .then((response) => {
        console.log("promise fulfilled");
        setTags(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTags();
  }, []);

  // Insert Translation
  const submitTranslation = async (e) => {
    await e.preventDefault();
    // check first if the submiited values already exists in the array
    // database is set to accept only unique values
    try {
      if (
        translations.find(
          (translation) => translation.english == newTranslation.english,
          true
        )
      ) {
        window.alert(
          "Sorry " +
            newTranslation.english +
            " already exists. Please use a different word"
        );
        return;
      }
      if (
        translations.find(
          (translation) => translation.english == newTranslation.english,
          true
        )
      ) {
        window.alert(
          "Sorry " +
            newTranslation.finnish +
            " already exists. Please enter a different word"
        );
        return;
      }
      // clear form fields
      await e.target.reset();
      // api posts the newTranslation object to the database
      await axios.post("/api/add", newTranslation, {
        headers: {
          "content-type": "application/json",
        },
      });
      // fetches the updated data from the database
      // may change to updating the array instead in futire releases
      await getTranslations();
      setNewTranslation({ english: "", finnish: "", tag_id: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Translation
  // Returns updated data to confirm
  const deleteTranslation = (id) => {
    axios
      .delete(`/api/delete/${id}`)
      .then((result) => {
        getTranslations();
      })
      .catch(() => {
        window.alert("Oops something went wrong");
      });
  };

  return (
    <section>
      <Container>
        {/* props passed to the admin table */}
        <AdminTable
          tags={tags}
          translations={translations}
          deleteTranslation={deleteTranslation}
          SubmitForm={SubmitForm}
          newTranslation={newTranslation}
          submitTranslation={submitTranslation}
          setNewTranslation={setNewTranslation}
        />
      </Container>
    </section>
  );
};

export default Translations;
