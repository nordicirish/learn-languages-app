import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";

const Home = () => {
  // useState function to initialize the piece of state stored in translations with the array of translataion values passed in the props:
  const [translations, setTranslations] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
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

  const submitAnswer = async (e) => {
    e.preventDefault();
    alert("correct answer " + correctAnswer);
    alert("submitted answer " + userAnswer);
  };
  // const finnish = translation.finnish;
  const onInputChange = (e) => {
    setCorrectAnswer(e.target.name);
    setUserAnswer(e.target.value);
  };

  return (
    <div className="row mt-4">
      <div className="col-sm-8 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Test yourself</h4>
        <Form>
          {translations.map((translation) => (
            <Row key={translation.id} className="align-items-center">
              <Col sm={5} className="my-1">
                <InputGroup size="lg">
                  <InputGroup.Text
                    id="language1"
                    aria-describedby="English word"
                  >
                    {translation.english}
                  </InputGroup.Text>
                  <Form.Control
                    id={translation.id}
                    name={translation.finnish}
                    placeholder="Finnish word"
                    onChange={(e) => onInputChange(e)}
                    aria-label="Enter the Finnish translation"
                    pattern="[a-zA-ZäöåÄÖÅ]*"
                    title="The word should have only letters"
                    required
                  />
                  <Form.Label
                    id="correct"
                    htmlFor="inlineFormInputGroupUsername"
                    visuallyHidden
                  >
                    You got it right!
                  </Form.Label>
                  <Form.Label
                    htmlFor="inlineFormInputGroupUsername"
                    visuallyHidden
                  >
                    Oops wrong answer!
                  </Form.Label>
                </InputGroup>
              </Col>

              <Col xs="auto" className="my-1">
                <Button type="submit" onClick={submitAnswer}>
                  Answer
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </div>
    </div>
  );
};

export default Home;
