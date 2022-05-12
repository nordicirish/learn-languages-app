import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import { ButtonGroup } from "react-bootstrap";

const Home = () => {
  const [translations, setTranslations] = useState([]);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState({});
  const [currentId, setCurrentId] = useState(null);
  // const [valid, setValid] = useState(false);
  const increment = () => setCounter((count) => count + 1);

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

  useEffect(() => {
    console.log("id " + id);
    console.log("counter " + counter);
  });

  const [questionAnswer, setQuestionAnswer] = useState({
    id: null,
    rightAnswer: "",
    userAnswer: "",
  });
  const { id, rightAnswer, userAnswer } = questionAnswer;

  const onInputChange = (e) => {
    setQuestionAnswer({
      ...questionAnswer,
      id: e.target.id,
      rightAnswer: e.target.name,
      userAnswer: e.target.value,
    });

    // const nextSibling = document.querySelector(`input[name=${rightAnswer}]`);

    // // If found, focus the next field
    // if (nextSibling !== null) {
    //   nextSibling.focus();
    // }
  };

  const submitAnswer = (e) => {
    e.preventDefault();

    if (rightAnswer.length > 0 && rightAnswer === userAnswer) {
      increment();
      const attr = document.createAttribute("class");
      attr.value = "correct-input";
      const correctInput = document.getElementById(id);
      correctInput.setAttributeNode(attr);
      correctInput.ariaDisabled = true;
      correctInput.disabled = true;
    }
  };

  return (
    <div className="row mt-4 text-center">
      <div className=" col-sm-10 col-offset-3 mx-auto shadow p-5 ">
        <h4 className="text-center mb-4">Test yourself</h4>
        <Form>
          {translations.map((translation) => (
            <Row
              key={translation.id}
              // id={translation.id}
              className="justify-content-center"
            >
              <Col sm={12} m={12} lg={10} className="my-1">
                <InputGroup size="lg">
                  <InputGroup.Text aria-describedby="English word">
                    {translation.english}
                  </InputGroup.Text>

                  {show && (
                    <Form.Control
                      id={translation.id}
                      name={translation.finnish}
                      placeholder="Finnish word"
                      autoComplete="off"
                      onChange={(e) => onInputChange(e)}
                      aria-label="Enter the Finnish translation"
                      pattern="[a-zA-ZäöåÄÖÅ]*"
                      title="The word should have only letters"
                      required
                    />
                  )}
                </InputGroup>
              </Col>
              <Col>
                <ButtonGroup
                  className="d-grid gap-2 col-12 mx-auto"
                  id={translation.id}
                >
                  <Button
                    id={translation.id}
                    name={translation.finnish}
                    value={userAnswer}
                    type="button"
                    onClick={(e) => submitAnswer(e)}
                  >
                    Answer
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          ))}
        </Form>
      </div>
    </div>
  );
};

export default Home;
