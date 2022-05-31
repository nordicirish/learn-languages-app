import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const EditTranslation = () => {
  //useNavigate hook allows to navigate away from the current url
  let navigate = useNavigate();
  // useParam hook captures url paramater
  // used to navigate back to the translations page on cancel or update
  const { id } = useParams();

  const [translation, setTranslation] = useState({
    english: "",
    finnish: "",
    tag_id: "",
  });

  const [tags, setTags] = useState([]);
  // destructure the translation object and assign it's values to the named variables
  const { english, finnish, tag_id } = translation;
  const onInputChange = (e) => {
    setTranslation({ ...translation, [e.target.id]: e.target.value });
  };

  // uses the api to fetch the selected item from the database
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
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect ensures the fetch happens once on the initial page load
  useEffect(() => {
    getTranslation();
  }, []);

  // uses the api to returns a list of tags from the database tag table to populate the form tag dropdwon
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

  const updateTranslation = async (e) => {
    e.preventDefault();
    // tells the api to update the item with the amended values
    await axios.put(`/api/update/${id}`, translation);
    // navigates the browser back to the translations admin screen
    navigate("/translations");
  };

  const cancelUpdate = async (e) => {
    // prevents button acting as a submit button
    e.preventDefault();
    navigate("/translations");
  };
  // get translation to populate form fields

  return (
    <Container>
      <div className="row mt-4">
        <div className=" col-8 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-offset-3 mx-auto shadow p-5">
          <h4 className="text-center mb-4">Edit a translation</h4>
          <Form>
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
                // validates english letters
                pattern="[a-zA-Z]*"
                // used to store the validation error message
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
                // validates nordic letters
                pattern="[a-zA-ZäöåÄÖÅ]*"
                title="The word should have only letters"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                id="tag_id"
                name="tag_id"
                onChange={(e) => onInputChange(e)}
                aria-label="Please select a tag"
                value={tag_id}
                required
              >
                {/* map the tag names to the list items on the form */}
                <option value="">Select a tag</option>
                {tags.map((tag) => (
                  <option key={tag.tag} value={tag.tag}>
                    {tag.tag}
                  </option>
                ))}
              </Form.Select>
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
