import React, { useState, useEffect, render, useCallback } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import { ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameForm = ({
  id,
  setId,
  setButtonId,
  translations,
  isDisabled,
  onInputChange,
  handleSubmit,
  setUserAnswer,
  setRightAnswer,
}) => {
  const [reset, setReset] = useState();

  useEffect(() => {
    setReset();
  }, []);
  const handleReset = async (e) => {
    window.location.reload(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {translations.map((translation, index) => (
        <Row
          key={index}
          // id={translation.id}
          className="justify-content-center mt-3 align-items-center"
        >
          <Col xs={10} sm={10} m={10} lg={10} className="my-1">
            <InputGroup size="lg" key={index}>
              <InputGroup.Text
                className="bg-info bg-gradient fs-3 text justify-content-center"
                aria-describedby="English word"
              >
                {translation.english}
              </InputGroup.Text>
              <Form.Control
                autoFocus={true}
                spellCheck="false"
                disabled={isDisabled}
                className="fs-3 text-center"
                //   add 1 or first entry will be 0 and the first input id won't be set a value
                id={index + 1}
                name={translation.finnish}
                placeholder="Finnish word"
                autoComplete="off"
                onChange={(e) => {
                  onInputChange(e);
                }}
                aria-label="Enter the Finnish translation"
                pattern="[a-zA-ZäöåÄÖÅ]*"
                title="The word should have only letters"
                required
              />
            </InputGroup>
          </Col>

          <Col xs={2} className="justify-content-center">
            {translation.isCorrect ? (
              <span className="text-warning fs-3 text ">
                <FontAwesomeIcon icon="fa-solid fa-face-smile" size="2x" />
              </span>
            ) : (
              <span className="justify-content-center">
                <Button
                  key={index}
                  onClick={handleSubmit}
                  className="btn btn-success btn-lg"
                >
                  Go
                  {/* <FontAwesomeIcon icon="fa-regular fa-tablet-button" /> */}
                </Button>
              </span>
              //   <ButtonGroup className="row-button" >
              //     <Button type="submit" >
              //       Answer
              //     </Button>
              //   </ButtonGroup>
            )}
          </Col>
        </Row>
      ))}
      <Row className="justify-content-start">
        <Col
          xs={10}
          sm={10}
          m={10}
          lg={10}
          className="fs-3 text justify-content-center"
        >
          <div className="d-grid gap-2">
            <Button
              className="mt-4 fs-2"
              size="lg"
              type="button"
              onClick={(e) => handleReset(e)}
            >
              Reset
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default GameForm;
