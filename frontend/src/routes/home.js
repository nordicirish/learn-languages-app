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
    // checks if user userAnswer is correct
    // before updating state
    // prevents empty values being passed
    try {
      if (userAnswer.length > 0 && rightAnswer === userAnswer) {
        await handleFormat(e);
        await toggle();
        await increment();
        // reset answer values
        setUserAnswer("");
        setRightAnswer("");
      } else {
        window.alert("Im sorry that's not correct");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = async (e) => {
    // stops a page reload
    e.preventDefault();

    // sets id state to the current array row index
    setId(e.target.id);

    // possible future implementation
    // setButtonId(id);
    // sets the word pair to the current form row values
    setUserAnswer(e.target.value);
    setRightAnswer(e.target.name);
  };
  // updates the state of 1 row referenced by id
  const toggle = (e) => {
    console.log("id is" + id);
    // id is incremented by 1 in the GameForm Component
    // so need to subtract 1 to synchronise with array index values
    let adjustedIndex = Number(id) - 1;
    // make shallow copies of array and selected element to avoid state mutation
    let copyArray = [...translations];
    let copyTranslation = { ...copyArray[adjustedIndex] };
    console.log("temp element " + copyTranslation);
    // switch the boolean value of the element
    copyTranslation.isCorrect = !isCorrect;
    // update the element in the copied array
    copyArray[adjustedIndex] = copyTranslation;
    // Use the copy to array set the new isCorrect state
    setTranslations(copyArray);
  };

  const handleFormat = (e) => {
    // copies the strings to avoid mutation then formats them and
    // uses setState to update their original states
    try {
      let copyRightAnswer = rightAnswer;
      let copyUserAnswer = userAnswer;
      // trim and toLocaleLowerCase applied to strings
      // compared strings set to the same case (lowercase) and remove spaces
      copyUserAnswer.trim();
      copyUserAnswer.toLocaleLowerCase();
      setUserAnswer(copyUserAnswer);
      copyRightAnswer.trim();
      copyRightAnswer.toLocaleLowerCase();
      setRightAnswer(copyUserAnswer);
    } catch (error) {
      console.log(error);
    }
  };

  // false argument reloads page from local memory
  const handleReset = async (e) => {
    window.location.reload(false);
  };

  return (
    <GameForm
      // props passed to GameForm
      onInputChange={onInputChange}
      counter={counter}
      handleSubmit={handleSubmit}
      translations={translations}
      userAnswer={userAnswer}
      handleReset={handleReset}
    />
  );
};

export default Home;
