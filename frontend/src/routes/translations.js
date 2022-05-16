import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import AdminTable from "../components/AdminTable";
import SubmitForm from "../components/SubmitForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// "proxy": "http://localhost:8080" in package.json allows short urls

import "bootstrap/dist/css/bootstrap.min.css";

const Translations = () => {
  const [translations, setTranslations] = useState([]);
  const [show, setShow] = useState(false);

  // const [translation, setTranslation] = useState({
  //   english: "",
  //   finnish: "",
  //   tag_id: "",
  // });

  const [newTranslation, setNewTranslation] = useState({
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
      .catch((error) => {
        console.log(error);
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
      await axios.post("/api/add", newTranslation, {
        headers: {
          "content-type": "application/json",
        },
      });
      await getTranslations();
      setNewTranslation({ english: "", finnish: "", tag_id: "" });
      // setShow(true);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <section>
      {/* <Toast
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
      </Toast> */}
      <Container>
        <Row
          className="justify-content-center  d-flex
          flex-row-reverse"
          xs="12"
          md="12"
          lg="12"
        >
          <Col xs="9" sm="8" md="6" lg="4" xl="4">
            <SubmitForm
              tags={tags}
              newTranslation={newTranslation}
              submitTranslation={submitTranslation}
              setNewTranslation={setNewTranslation}
            />
          </Col>
          <Col md="12" lg="8" xl="8">
            <AdminTable
              tags={tags}
              translations={translations}
              deleteTranslation={deleteTranslation}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Translations;
