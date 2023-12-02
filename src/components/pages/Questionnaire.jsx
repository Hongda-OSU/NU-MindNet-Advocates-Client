import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "../Header/Header";
import PersonInfo from "../Questionnaire/PersonInfo";
import Questions from "../Questionnaire/Questions";

const Questionnaire = () => {
  const [step, setStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [people, setPeople] = useState([
    { name: "", gender: "", age: "" },
    { name: "", gender: "", age: "" },
    { name: "", gender: "", age: "" },
    { name: "", gender: "", age: "" },
  ]);
  const questions = [
    "Who do you think this person will most likely collaborate with on a project?",
    "Which of the following people do you think this person would choose to travel with?",
  ];

  const handlePersonInputChange = (index, name, value) => {
    const newPeople = [...people];
    newPeople[index][name] = value;
    setPeople(newPeople);
  };

  const handleAddPerson = () => {
    setPeople([...people, { name: "", gender: "", age: "" }]);
  };
  const handleDeletePerson = () => {
    // Check if the array is not empty
    if (people.length > 4) {
      // Create a new array without the last element
      const newPeople = people.slice(0, -1);
      // Update the state with the new array
      setPeople(newPeople);
    }
  };

  const handleNext = () => {
    const isAllFieldsFilled = people.every(
      (person) =>
        person.name.trim() &&
        person.gender.trim() &&
        person.age.toString().trim()
    );

    if (isAllFieldsFilled) {
      setStep(2); // Go to the next step if every person has all fields filled
    } else {
      alert("Please enter all the fields for each person.");
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredPeople = people.filter((person) => person.name.trim());
    if (filteredPeople.length < 3) {
      alert("Please add at least 3 people.");
      return;
    }
    const data = {
      people: filteredPeople,
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    // Here you would send jsonData to your backend API
  };
  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            mt: 4,
          }}
        >
          {step === 1 && (
            <PersonInfo
              people={people}
              handleNext={handleNext}
              handleAddPerson={handleAddPerson}
              handleDeletePerson={handleDeletePerson}
              handlePersonInputChange={handlePersonInputChange}
            />
          )}

          {step === 2 && (
            <Questions
              people={people}
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              handleBack={handleBack}
              handleSubmit={handleSubmit}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Questionnaire;
