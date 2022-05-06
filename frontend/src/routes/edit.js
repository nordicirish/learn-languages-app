import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// "proxy": "http://localhost:8080" in package.json allows short urls
const EditTranslation = () => {
  //useNavigate hook allows to navigate away from the current url
  let navigate = useNavigate();
  // useParam hook captures url paramater
  const { id } = useParams();

  const [translation, setTranslation] = useState({
    english: "",
    finnish: "",
    tag_id: "",
  });
  // destructure the translation object and assign it's values the named variables
  const { english, finnish, tag_id } = translation;

  const onInputChange = (e) => {
    setTranslation({ ...translation, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getTranslation();
  }, []);

  const updateTranslation = async (e) => {
    e.preventDefault();
    await axios.put(`/api/update/${id}`, translation);
    // navigates the browser back to the translations admin screen
    navigate("/translations");
  };

  const cancelUpdate = async (e) => {
    // prevents buton acting as a submit button
    e.preventDefault();
    navigate("/translations");
  };
  // get translation to populate form fields
  const getTranslation = () => {
    axios
      .get(`/api/find/${id}`)
      .then((response) => {
        console.log("promise fulfilled");
        setTranslation({
          id: id,
          english: response.data.english,
          finnish: response.data.finnish,
          tag_id: response.data.tag_id,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <div className="row mt-4">
        <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
          <h4 className="text-center mb-4">Edit a translation</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="input"
                type="text"
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
                value={tag_id}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter the tag"
                required
                pattern="[a-zA-Z]*"
                title="The word should have only English letters"
              />
            </Form.Group>

            <Button type="submit" id="1" onClick={updateTranslation}>
              Update
            </Button>
            <Button
              variant="secondary"
              type="button"
              id="2"
              onClick={cancelUpdate}
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default EditTranslation;
