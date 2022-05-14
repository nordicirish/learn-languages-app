import React, { useState, useEffect, render, useCallback } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";

const GameForm = ({ translations, isDisabled, onInputChange }) => {
  const [reset, setReset] = useState();

  useEffect(() => {
    setReset();
  }, []);
  const handleReset = async (e) => {
    window.location.reload(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setReset({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      {translations.map((translation) => (
        <Row
          key={translation.id}
          // id={translation.id}
          className="justify-content-center"
        >
          <Col sm={12} m={12} lg={10} className="my-1">
            <InputGroup size="lg">
              <InputGroup.Text
                className="bg-info bg-gradient fs-2 text justify-content-center"
                aria-describedby="English word"
              >
                {translation.english}
              </InputGroup.Text>
              <Form.Control
                autoFocus
                disabled={isDisabled}
                className="fs-2 text-center"
                id={translation.id}
                name={translation.finnish}
                placeholder="Finnish word"
                autoComplete="off"
                // onChange={(e) => onInputChange(e)}
                onChange={onInputChange}
                // onKeyPress={handleKeypress}
                aria-label="Enter the Finnish translation"
                pattern="[a-zA-ZäöåÄÖÅ]*"
                title="The word should have only letters"
                required
              />
            </InputGroup>
          </Col>
        </Row>
      ))}
      <Row>
        <Col className="my-auto">
          <Button size="lg" type="button" onClick={(e) => handleReset(e)}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default GameForm;
