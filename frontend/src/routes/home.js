import React, {
  useState,
  useEffect,
  render,
  useCallback,
  useMemo,
} from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import GameForm from "../components/GameForm";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [showField, setShowField] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [id, setId] = useState("");
  const [buttonId, setButtonId] = useState(null);
  const [translations, setTranslations] = useState([
    {
      id: "",
      english: "",
      finnish: "",
      tag_id: "",
      isCorrect: false,
    },
  ]);

  // const [valid, setValid] = useState(false);
  const increment = () => setCounter((count) => count + 1);

  const getTranslations = () => {
    axios
      .get("/api/all")
      .then((response) => {
        console.log("promise fulfilled");
        const updatedResponse = response.data;
        // add isCorrect property for reference in state changes
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

  useEffect(() => {
    getTranslations();
  }, []);

  useEffect(() => {});

  useEffect(() => {
    console.log();
  }, [counter, translations, userAnswer, rightAnswer]);
  console.log("render", translations);
  //  console.log("render", userAnswer, rightAnswer, isDisabled);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updater(e);

    // setReset({});
  };
  const toggle = (e) => {
    console.log("id is" + id);
    // id is increment by 1 in the GameForm Component
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

  const updater = async (e) => {
    if (userAnswer.length > 0 && rightAnswer === userAnswer) {
      const correctInput = document.getElementById(id);
      // const attr = document.createAttribute("class");
      // attr.value = "correct-input";
      // correctInput.setAttributeNode(attr);
      correctInput.ariaDisabled = true;
      correctInput.disabled = true;
      toggle();
      increment();
      //   // } else {
      //   //   const inCorrectInput = document.getElementById(id);
      //   //   const attr2 = document.createAttribute("class");
      //   //   attr2.value = "incorrect-input";
      //   //   inCorrectInput.setAttributeNode(attr2);
    }
  };

  const onInputChange = async (e) => {
    e.preventDefault();
    setId(e.target.id);
    setButtonId(id);
    setUserAnswer(e.target.value);
    setRightAnswer(e.target.name);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GameForm
      isDisabled={isDisabled}
      onInputChange={onInputChange}
      counter={counter}
      handleSubmit={handleSubmit}
      translations={translations}
    />
  );
};

export default Home;
