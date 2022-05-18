import React, { useState, useEffect, render, useCallback } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import { ButtonGroup } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameForm = ({
  translations,
  isDisabled,
  onInputChange,
  handleSubmit,
  counter,
}) => {
  const [reset, setReset] = useState();

  useEffect(() => {
    setReset();
  }, []);
  const handleReset = async (e) => {
    window.location.reload(false);
  };

  return (
    <div className="row mt-4 text-center">
      <div className="col-sm-10 col-offset-3 mx-auto shadow p-5">
        <Row className="justify-content-start">
          <Col className="fs-2 mb-2 text " xs={10}>
            {/* conditional rendering badge changes colour depending on score */}
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
          <Col className="fs-2 text" xs={3} sm={3} m={3} lg={3} xl={3}>
            <h2>English</h2>

            {/* //test  */}
            {/* {showField === true && <p>Name: {rightAnswer}</p>} */}
          </Col>
          <Col className="fs-2 text" xs={7} sm={7} m={7} lg={7} xl={7}>
            <h2>Finnish</h2>
          </Col>
        </Row>
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
                    // disabled={isDisabled}
                    //   change input appearance if user answer is correct
                    className={
                      translation.isCorrect
                        ? "fs-4 text-center correct-input"
                        : "fs-4 text-center"
                    }
                    //   add 1 or first entry will be 0 and the first input id won't be set a value
                    id={index + 1}
                    name={translation.finnish}
                    placeholder="Finnish word"
                    autoComplete="off"
                    onChange={(e) => {
                      onInputChange(e);
                    }}
                    disabled={translation.isCorrect ? true : false}
                    aria-label="Finnish word"
                    pattern="[a-zA-ZäöåÄÖÅ]*"
                    title="The word should have only letters"
                    required
                  />
                </InputGroup>
              </Col>
              <Col xs={2} className="justify-content-center">
                {translation.isCorrect ? (
                  <span className="text-warning fs-4 text ">
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
                    </Button>
                  </span>
                )}
              </Col>
            </Row>
          ))}
          <Row className="justify-content-start">
            <Col xs={10} className="fs-3 text justify-content-center">
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
      </div>
    </div>
  );
};

export default GameForm;
