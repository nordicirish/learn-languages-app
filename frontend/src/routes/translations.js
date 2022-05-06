import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";

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

  //  Object Destructuring
  const { english, finnish, tag_id } = translation;
  const onInputChange = (e) => {
    setTranslation({ ...translation, [e.target.name]: e.target.value });
  };

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

  // Insert Translation
  const submitTranslation = async (e) => {
    e.preventDefault();
    e.target.reset();

    await axios.post("/api/add", translation, {
      headers: {
        "content-type": "application/json",
      },
    });

    await getTranslations();
    // clear form fields
    setTranslation({ english: "", finnish: "", tag_id: "" });
    setShow(true);
  };

  // Delete Translation
  const deleteTranslation = (id) => {
    axios
      .delete(`/api/delete/${id}`)
      .then((result) => {
        getTranslations();
      })
      .catch(() => {
        alert("Oops something went wrong");
      });
  };

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
          <div className="col-sm-4">
            <div
              className="box p-3 mb-3 mt-0"
              style={{ border: "1px solid #d0d0d0" }}
            >
              <Form onSubmit={submitTranslation}>
                <h4 className="mb-3 ">Add a translation</h4>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="input"
                    type="text"
                    id="english"
                    name="english"
                    value={english}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter the English word"
                    required
                    pattern="[a-zA-Z]*"
                    title="The word should have only English letters"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="input"
                    type="text"
                    id="finnish"
                    name="finnish"
                    value={finnish}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter the Finnish translation"
                    pattern="[a-zA-ZäöåÄÖÅ]*"
                    title="The word should have only letters"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="tag_id"
                    id="tag_id"
                    value={tag_id}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter the tag"
                    required
                    pattern="[a-zA-Z]*"
                    title="The word should have only English letters"
                  />
                </Form.Group>

                <Button type="submit">Add</Button>
              </Form>
            </div>
          </div>
          <div className="col-sm-8">
            <Table
              borderless
              size="m"
              className="table admin-table table-striped   "
            >
              <thead className="thead-dark thead-blue">
                <tr>
                  <th>English</th>
                  <th>Finnish</th>
                  <th style={{ width: "22%" }}>Tag</th>
                  <th style={{ width: "8%" }}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {translations.map((translation) => (
                  <tr key={translation.id}>
                    <td>{translation.english}</td>
                    <td>{translation.finnish}</td>
                    <td>{translation.tag_id}</td>

                    <td>
                      <a
                        className="red-bin mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Are you sure that you want to delete " +
                              translation.english
                          );
                          if (confirmBox === true) {
                            deleteTranslation(translation.id);
                          }
                        }}
                      >
                        <i
                          className="far fa-trash-alt"
                          style={{ fontSize: "18px", marginRight: "5px" }}
                        ></i>
                      </a>

                      <Link
                        className=" mr-2"
                        to={`/translations/edit/${translation.id}`}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Translations;
