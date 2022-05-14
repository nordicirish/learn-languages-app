import React, { useState, useEffect, render, useCallback } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import { ButtonGroup } from "react-bootstrap";
import GameForm from "../components/GameForm";

const Home = () => {
  const [translations, setTranslations] = useState([]);
  const [counter, setCounter] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [show, setShow] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
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
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTranslations();
  }, []);

  const [questionAnswer, setQuestionAnswer] = useState({
    id: null,
    rightAnswer: "",
    userAnswer: "",
  });
  const { id, rightAnswer, userAnswer } = questionAnswer;
  useEffect(() => {
    console.log("useEffect", correct);
  }, [correct, isDisabled]);
  console.log("render", correct, isDisabled);

  const update = async (e) => {
    if (userAnswer.length > 0 && userAnswer === rightAnswer) {
      setCorrect(true);
      const correctInput = document.getElementById(id);
      const attr = document.createAttribute("class");
      attr.value = "correct-input";
      correctInput.setAttributeNode(attr);
      correctInput.ariaDisabled = true;
      correctInput.disabled = true;
      increment();
    } else {
      setCorrect(false);
    }

    // // array.forEach((element) => {
    // //   if (correct === true) {

    // //   }
    // });
  };

  const onInputChange = async (e) => {
    e.preventDefault();
    setQuestionAnswer(() => ({
      ...questionAnswer,
      id: e.target.id,
      rightAnswer: e.target.name,
      userAnswer: e.target.value,
    }));
    // necessary other won't fire in sequence
    await update();
  };

  return (
    <div className="row mt-4 text-center">
      <div className="col-sm-10 col-offset-3 mx-auto shadow p-5">
        <Row className="justify-content-center">
          <Col className="fs-2 text" xs={6} sm={6} m={6} lg={5} xl={5}></Col>
          <Col className="fs-2 text" xs={6} sm={6} m={6} lg={5} xl={5}>
            {counter > 0 ? (
              <Badge pill bg="info">
                {counter} out of {translations.length}
              </Badge>
            ) : (
              <Badge pill bg="info">
                Let's go!
              </Badge>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="fs-2 text" xs={6} sm={6} m={6} lg={5} xl={5}>
            <h2>English</h2>
          </Col>
          <Col className="fs-2 text" xs={6} sm={6} m={6} lg={5} xl={5}>
            <h2>Finnish</h2>
          </Col>
        </Row>

        <GameForm
          translations={translations}
          isDisable={isDisabled}
          onInputChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default Home;
