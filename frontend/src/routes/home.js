import React, { useState, useEffect } from "react";
import axios from "axios";
// GameForm component renders the game
import GameForm from "../components/GameForm";

const Home = () => {
  const [counter, setCounter] = useState(0);
  // used to record if the user input is correct
  // for toggling the display properties of GameForm elements
  const [isCorrect, setIscorrect] = useState(false);
  // hold the values of the selected GameForm word pair
  const [userAnswer, setUserAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  // used to capture the current translations array index value
  const [id, setId] = useState("");
  // not yet implemented assigns an id
  // const [buttonId, setButtonId] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  // increments the state of the user score
  const increment = () => setCounter((count) => count + 1);

  const getTranslations = () => {
    axios
      .get("/api/all")
      .then((response) => {
        console.log("promise fulfilled");
        const updatedResponse = response.data;
        // add isCorrect property for reference in state changes
        // initialise as false
        const updatedData = updatedResponse.map((translation) => ({
          ...translation,
          isCorrect: false,
          showAlert: false,
        }));
        // console.log(...updatedData);
        setTranslations([...updatedData]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect runs getTranslations once on page load
  useEffect(() => {
    getTranslations();
  }, []);

  // used to render console.log
  useEffect(() => {
    console.log(" userAnswer is " + userAnswer);
    console.log(" rightAnswer is " + rightAnswer);
  }, [counter, translations, userAnswer, rightAnswer]);
  console.log("render", userAnswer, rightAnswer);
  //  console.log("render", userAnswer, rightAnswer, isDisabled);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // checks if userAnswer is correct
    // before updating state
    // prevents empty values being passed
    try {
      if (userAnswer.length > 0 && rightAnswer === userAnswer) {
        // await handleFormat();
        toggleCorrect();
        increment();
        // reset answer values
        setUserAnswer("");
        setRightAnswer("");
      } else {
        toggleIncorrect();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = async (e) => {
    e.preventDefault();
    try {
      // sets id state to the current array row index
      setId(e.target.id);

      // possible future implementation
      // setButtonId(id);
      // sets the word pair to the current form row values
      setUserAnswer(e.target.value.toLowerCase().trim());
      setRightAnswer(e.target.name.toLowerCase().trim());
    } catch (error) {
      console.log(error);
    }
    // stops a page reload
  };

  // updates the state of 1 row referenced by id value
  // if a submitted answer is correct
  const toggleCorrect = (e) => {
    try {
      //  console.log("id is" + id);
      // id is incremented by 1 in the GameForm Component
      // so need to subtract 1 to synchronise with array index values
      let adjustedIndex = Number(id) - 1;
      // make shallow copies of array and selected element to avoid state mutation
      let copyArray = [...translations];
      let copyTranslation = { ...copyArray[adjustedIndex] };
      console.log("temp element " + copyTranslation);
      // set showAlert false as answer will be correct
      copyTranslation.showAlert = false;
      // switch the boolean value of isCorrect
      copyTranslation.isCorrect = !isCorrect;
      // update the element in the copied array
      copyArray[adjustedIndex] = copyTranslation;
      // Use the copy to array set the new isCorrect state
      setTranslations(copyArray);
    } catch (error) {
      console.log(error);
    }
  };
  // updates the state of 1 row referenced by id value
  // if a submitted answer is incorrect
  const toggleIncorrect = (e) => {
    try {
      // id is incremented by 1 in the GameForm Component
      // so need to subtract 1 to synchronise with array index values
      let adjustedIndex = Number(id) - 1;
      // make shallow copies of array and selected element to avoid state mutation
      let copyArray = [...translations];
      let copyTranslation = { ...copyArray[adjustedIndex] };
      console.log("temp element " + copyTranslation);
      // switch the boolean value of the showAlert
      copyTranslation.showAlert = !showAlert;
      // update the element in the copied array
      copyArray[adjustedIndex] = copyTranslation;
      // Use the copy to array set the new isCorrect state
      setTranslations(copyArray);
    } catch (error) {
      console.log(error);
    }
  };

  // false argument reloads page from local memory
  const handleReset = async (e) => {
    try {
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GameForm
        // props passed to GameForm
        onInputChange={onInputChange}
        counter={counter}
        handleSubmit={handleSubmit}
        translations={translations}
        userAnswer={userAnswer}
        handleReset={handleReset}
        showAlert={showAlert}
      />
    </>
  );
};

export default Home;
