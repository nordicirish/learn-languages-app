import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import AdminTable from "../components/AdminTable";
import SubmitForm from "../components/SubmitForm";

// "proxy": "http://localhost:8080" in package.json allows short urls

// import "bootstrap/dist/css/bootstrap.min.css";

const Translations = () => {
  const [translations, setTranslations] = useState([]);
  const [show, setShow] = useState(false);

  const [translation, setTranslation] = useState({
    english: "",
    finnish: "",
    tag_id: "",
  });

  const [tags, setTags] = useState([]);

  // On Page load display all records
  const getTranslations = () => {
    axios
      .get("/api/all")
      .then((response) => {
        console.log("promise fulfilled");
        setTranslations(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTranslations();
  }, []);

  const getTags = () => {
    axios
      .get("/api/Tags")
      .then((response) => {
        console.log("promise fulfilled");
        setTags(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTags();
  }, []);

  // Insert Translation
  const submitTranslation = async (e) => {
    await e.preventDefault();
    await e.target.reset();

    await axios.post("/api/add", translation, {
      headers: {
        "content-type": "application/json",
      },
    });
    await getTranslations();
    // clear form fields
    setTranslation({ english: "", finnish: "", tag_id: "" });
    // setShow(true);
  };

  // Delete Translation
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
  // render(console.log(translation.tag_id));
  return (
    <section>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg="success"
      >
        <Toast.Header>
          <strong className="me-auto">Success!</strong>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
      <Container>
        <div className="row d-flex flex-row-reverse mt-3">
          <SubmitForm
            tags={tags}
            translation={translation}
            submitTranslation={submitTranslation}
            setTranslation={setTranslation}
          />
          <AdminTable
            translations={translations}
            deleteTranslation={deleteTranslation}
          />
        </div>
      </Container>
    </section>
  );
};

export default Translations;
