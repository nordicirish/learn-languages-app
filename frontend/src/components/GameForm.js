import React from "react";
//import React-Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
// Button group may be needed to map an id onto each button for future development
import { ButtonGroup } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
// import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// named props passed from the home page
const GameForm = ({
  translations,
  onInputChange,
  handleSubmit,
  counter,
  handleReset,
}) => {
  return (
    //   bootsrap  repsonsive layout classes
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
        {/* Column headings */}
        <Row className="justify-content-center mt-2">
          <Col className="fs-2 text" xs={3} sm={3} m={3} lg={3} xl={3}>
            <h2>English</h2>
          </Col>
          <Col className="fs-2 text" xs={7} sm={7} m={7} lg={7} xl={7}>
            <h2>Finnish</h2>
          </Col>
        </Row>
        {/* user input form */}
        <Form>
          {/* map translations into the form 
                  index added for reference*/}
          {translations.map((translation, index) => (
            <React.Fragment key={index}>
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
                      spellCheck="false"
                      // disabled={isDisabled}
                      //   change input appearance if user answer is correct
                      className={
                        translation.isCorrect
                          ? "fs-4 text-center correct-input"
                          : "fs-4 text-center"
                      }
                      //  use id and name to store values
                      //   add 1 or first entry will be 0 and the first input id won't be set a value
                      id={index + 1}
                      name={translation.finnish}
                      //   User sees this text in the form field
                      placeholder="Finnish word"
                      // stops the browser pasting previous values
                      autoComplete="off"
                      onChange={(e) => {
                        onInputChange(e);
                      }}
                      // correct answer will disable the input field
                      disabled={translation.isCorrect ? true : false}
                      // tells assistive technology the input is disabled
                      aria-disabled={translation.isCorrect ? true : false}
                      // label to help assistive technology users
                      aria-label="Finnish word"
                      // validate nordic letters
                      // pattern="[a-zA-ZäöåÄÖÅ]*"
                      title="Enter the Finnish word"
                      required
                    />
                  </InputGroup>
                </Col>
                <Col xs={2} className="justify-content-center">
                  {translation.isCorrect ? (
                    <span className="text-warning fs-4 text ">
                      <FontAwesomeIcon
                        // tell screen readers to ignore the icon
                        aria-hidden="true"
                        icon="fa-solid fa-face-smile"
                        size="2x"
                        title="Correct!"
                      />
                      {/* text for screen readers */}
                      <span className="sr-only">Correct!</span>
                    </span>
                  ) : (
                    <span className="justify-content-center">
                      <Button
                        key={index}
                        title="click me to check your answer"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                        className="btn btn-success btn-lg"
                      >
                        Go
                      </Button>
                    </span>
                  )}
                </Col>
              </Row>
            </React.Fragment>
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
