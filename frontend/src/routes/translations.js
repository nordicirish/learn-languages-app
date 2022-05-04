import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";

// import "bootstrap/dist/css/bootstrap.min.css";

const Translations = () => {
  const [translations, setTranslations] = useState([]);
  const [show, setShow] = useState(false);

  const [translation, setTranslation] = useState({
    english: "",
    finnish: "",
    tag: "",
  });

  //  Object Destructuring
  const { english, finnish, tag } = translation;
  const onInputChange = (e) => {
    setTranslation({ ...translation, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const getTranslations = () => {
    axios
      .get("http://localhost:8080/translations")
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
    const translationObj = {
      english: translation.english,
      finnish: translation.finnish,
      tag_id: translation.tag,
    };

    await axios.post("http://localhost:8080/translations/add", translationObj, {
      headers: {
        "content-type": "application/json",
      },
    });

    await getTranslations();
    // clear form fields
    setTranslation({ english: "", finnish: "", tag: "" });
    setShow(true);
  };

  // Delete Translation
  const deleteTranslation = (id) => {
    axios
      .delete(`http://localhost:8080/translations/delete/${id}`)
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
                    name="tag"
                    id="tag"
                    value={tag}
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
              size="m"
              className="table  table-hover  table-striped table-bordered  "
            >
              <thead className="thead-dark thead-blue">
                <tr>
                  <th>English</th>
                  <th>Finnish</th>
                  <th>Tag</th>
                  <th>Edit</th>
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
                        to={`/EditTranslation/editID/${translation.id}`}
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
