import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import PersonInfo from "../Questionnaire/PersonInfo";
import Questions from "../Questionnaire/Questions";
import { postUserDataAndGetImages } from "../http/http.request";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submissionData, setSubmissionData] = useState(null);

  const initialPeople = [
    { userId: 0, name: "", gender: "", age: "" },
    { userId: 1, name: "", gender: "", age: "" },
    { userId: 2, name: "", gender: "", age: "" },
    { userId: 3, name: "", gender: "", age: "" },
  ];
  const [people, setPeople] = useState(initialPeople);

  // Initialize the nextUserId to be 1 greater than the highest initial userId
  const [nextUserId, setNextUserId] = useState(initialPeople.length);

  const handleAddPerson = () => {
    if (people.length < 13) {
      const newPerson = { userId: nextUserId, name: "", gender: "", age: "" };
      setPeople((prevPeople) => [...prevPeople, newPerson]);
      setNextUserId(nextUserId + 1); // Increment the ID for the next person

      setSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = { ...prevSelectedOptions };
        updatedOptions[newPerson.userId] = {};
        questions.forEach((_, questionIndex) => {
          updatedOptions[newPerson.userId][questionIndex] = [];
        });
        return updatedOptions;
      });
    } else {
      alert("Can't not input more people.");
    }
  };

  const handleDeletePerson = () => {
    if (people.length > 4) {
      const userIdToDelete = people[people.length - 1].userId;

      // Remove the last person from the people array
      setPeople((prevPeople) => prevPeople.slice(0, -1));

      // Remove the deleted person's selections and clean up other people's selections
      setSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = { ...prevSelectedOptions };

        // Delete the selections of the deleted person
        delete updatedOptions[userIdToDelete];

        // Iterate over all people to remove any selections of the deleted person
        Object.keys(updatedOptions).forEach((userId) => {
          Object.keys(updatedOptions[userId]).forEach((questionIndex) => {
            updatedOptions[userId][questionIndex] = updatedOptions[userId][
              questionIndex
            ].filter((targetUserId) => targetUserId !== userIdToDelete);
          });
        });

        return updatedOptions;
      });
    } else {
      alert("No more people to delete.");
    }
  };

  const questions = [
    "Imagine it's a Friday night and You are planning a fun party. Who do you think would be their top pick for an invite?",
    "Considering the diverse needs of university students, such as course selection, major determination, and the pursuit of career opportunities, who is likely to be the primary source of guidance for You in navigating these challenges?",
    "As a university student, you may encounter difficulties in your personal romantic relationships. In these situations, whom would You turn to for a discussion or guidance?",
    "Given the unique challenges and opportunities of university life, who do you think You will most likely consider as a potential roommate either living in university dorms or living in one apartment off-campus?",
    "As college students, team projects are an integral part of your academic life. Who do you believe You are most likely to partner with for a collaborative project?",
  ];

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initialSelections = {};
    people.forEach((person) => {
      initialSelections[person.userId] = {};
      questions.forEach((_, questionIndex) => {
        initialSelections[person.userId][questionIndex] = [];
      });
    });
    return initialSelections;
  });

  const handlePersonInputChange = (index, name, value) => {
    const newPeople = [...people];
    newPeople[index][name] = value;
    setPeople(newPeople);
  };

  const handleNext = (event) => {
    event.preventDefault();
    const filteredPeople = people.filter((person) => person.name.trim());
    if (filteredPeople.length < 3) {
      alert("Please add at least 3 people.");
      return;
    }
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

  const handleSubmit = () => {
    // Prepare connections data based on current selectedOptions
    const preparedConnections = questions
      .map((questionText, questionIndex) => {
        const connections = Object.entries(selectedOptions).flatMap(
          ([sourceUserId, userQuestions]) => {
            const targetUserIds = userQuestions[questionIndex] || [];
            return targetUserIds.map((targetUserId) => ({
              Source: parseInt(sourceUserId, 10),
              Target: targetUserId,
            }));
          }
        );

        return { [`Q${questionIndex}`]: connections };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    const updatedPeople = people.map(({ name, ...rest }) => rest);
    // Prepare final data including people and prepared connections
    const data = {
      Node_attr: updatedPeople,
      connections: preparedConnections,
    };

    const jsonData = JSON.stringify(data);

    // Instead of sending the data directly, set it in the state
    setSubmissionData(jsonData);
    console.log("Submitting data:", jsonData);
    // Here you would send jsonData to your backend API
  };

  useEffect(() => {
    if (submissionData) {
      // Make your HTTP request here with submissionData
      postUserDataAndGetImages("/api", submissionData)
        .then((response) => {
          // handle response
          const userIdToNameMapping = {};
          people.forEach((person) => {
            userIdToNameMapping[person.userId] = person.name.trim();
          });
          // Navigate to the result page with the response data and mapping
          navigate("/result", {
            state: { mapping: userIdToNameMapping },
          });
        })
        .catch((error) => {
          console.error(error);
          const userIdToNameMapping = {};
          people.forEach((person) => {
            userIdToNameMapping[person.userId] = person.name.trim();
          });
          navigate("/result", {
            state: { mapping: userIdToNameMapping },
          });
        });
    }
  }, [submissionData, navigate]);

  useEffect(() => {
    // Function to determine if an update is needed
    const isUpdateNeeded = (prevSelectedOptions) => {
      return people.some((person) => {
        if (!prevSelectedOptions[person.userId]) {
          return true; // New person added
        }
        return questions.some((_, questionIndex) => {
          return !prevSelectedOptions[person.userId][questionIndex];
        });
      });
    };

    setSelectedOptions((prevSelectedOptions) => {
      if (!isUpdateNeeded(prevSelectedOptions)) {
        return prevSelectedOptions; // No update needed, return the previous state
      }

      const updatedOptions = { ...prevSelectedOptions };

      people.forEach((person) => {
        if (!updatedOptions[person.userId]) {
          updatedOptions[person.userId] = {};
        }

        questions.forEach((_, questionIndex) => {
          if (!updatedOptions[person.userId][questionIndex]) {
            updatedOptions[person.userId][questionIndex] = [];
          }
        });
      });

      return updatedOptions;
    });
  }, [people, questions]);

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
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
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
