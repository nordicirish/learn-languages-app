import React, { useState, useEffect, render, useCallback } from "react";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
    console.log("correct value", correct);
    console.log("userAnswer", userAnswer);
    console.log("rightAnswer", rightAnswer);
  }, [correct, counter, userAnswer, rightAnswer]);
  console.log("render", correct, userAnswer, rightAnswer, isDisabled);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setReset({});
  };

  const updater = async (e) => {
    if (userAnswer.length > 0 && rightAnswer === userAnswer) {
      const correctInput = document.getElementById(id);
      const attr = document.createAttribute("class");
      attr.value = "correct-input";
      correctInput.setAttributeNode(attr);
      correctInput.ariaDisabled = true;
      correctInput.disabled = true;
      increment();
    }
    // else {
    //   const inCorrectInput = document.getElementById(id);
    //   const attr2 = document.createAttribute("class");
    //   attr2.value = "incorrect-input";
    //   inCorrectInput.setAttributeNode(attr2);
    // }
  };

  const onInputChange = async (e) => {
    e.preventDefault();
    try {
      setQuestionAnswer(() => ({
        ...questionAnswer,
        id: e.target.id,
        rightAnswer: e.target.name,
        userAnswer: e.target.value,
      }));
      await updater(e);
      await handleSubmit(e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row mt-4 text-center">
      <div className="col-sm-10 col-offset-3 mx-auto shadow p-5">
        <Row className="justify-content-center">
          {/* <Col className="fs-2 text" xs={6} sm={6} m={6} lg={5} xl={5}></Col> */}
          <Col className="fs-2 text" xs={6} sm={6} m={6} lg={5} xl={5}>
            {(() => {
              if (counter > 0 && counter <= 2) {
                return (
                  <Badge pill bg="danger" className="fs-2">
                    {counter} out of {translations.length}
                  </Badge>
                );
              } else if (counter > 2 && counter < translations.length) {
                return (
                  <Badge pill bg="warning" className="fs-2">
                    {counter} out of {translations.length}
                  </Badge>
                );
              } else if (counter === translations.length) {
                return (
                  <Badge pill bg="success" className="fs-2">
                    {counter} out of {translations.length}
                  </Badge>
                );
              } else {
                return (
                  <Badge pill bg="danger" className="fs-2">
                    Let's go!
                  </Badge>
                );
              }
            })()}
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
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
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
