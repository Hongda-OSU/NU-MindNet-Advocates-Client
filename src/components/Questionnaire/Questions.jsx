import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  List,
  ListItem,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

const Questions = ({
  people,
  questions,
  selectedOptions,
  setSelectedOptions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  handleBack,
  handleSubmit,
}) => {
  // Placeholder function for handling checkbox changes
  const handleCheckboxChange = (
    sourceUserId,
    questionIndex,
    targetUserId,
    isChecked
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = { ...prevSelectedOptions };
      const questionOptions = updatedOptions[sourceUserId] || {};
      const targetOptions = questionOptions[questionIndex] || [];

      if (isChecked) {
        // Add the targetUserId if it's not already in the array
        if (!targetOptions.includes(targetUserId)) {
          questionOptions[questionIndex] = [...targetOptions, targetUserId];
        }
      } else {
        // Remove the targetUserId
        questionOptions[questionIndex] = targetOptions.filter(
          (id) => id !== targetUserId
        );
      }

      updatedOptions[sourceUserId] = questionOptions;

      return updatedOptions;
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ display: "flex", mt: 4 }}>
        <Box sx={{ width: "25%", mr: 2 }}>
          <Button
            onClick={handleBack}
            variant="contained"
            sx={{ mb: 2, width: "auto", maxWidth: "fit-content" }}
          >
            Edit People Info
          </Button>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
            Questions
          </Typography>
          <List>
            {questions.map((question, index) => (
              <ListItem
                key={index}
                selected={index === currentQuestionIndex}
                onClick={() => setCurrentQuestionIndex(index)}
                sx={{
                  bgcolor:
                    index === currentQuestionIndex
                      ? "action.selected"
                      : "background.paper",
                }}
              >
                <Typography>Question {index + 1}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right side: Questions and checkbox options for each person */}
        <Box sx={{ width: "75%" }}>
          {people.map((person, personIndex) => (
            <Box key={personIndex} sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {questions[currentQuestionIndex]
                  .split("You")
                  .map((part, index, parts) =>
                    index < parts.length - 1 ? (
                      <React.Fragment key={index}>
                        {part}
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          {person.name || `Person ${personIndex + 1}`}
                        </span>
                      </React.Fragment>
                    ) : (
                      part
                    )
                  )}
              </Typography>

              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {people
                  .filter((_, filterIndex) => filterIndex !== personIndex)
                  .map((option) => {
                    const isSelected =
                      selectedOptions[people[personIndex].userId] &&
                      selectedOptions[people[personIndex].userId][
                        currentQuestionIndex
                      ] &&
                      selectedOptions[people[personIndex].userId][
                        currentQuestionIndex
                      ].includes(option.userId);

                    return (
                      <FormControlLabel
                        key={option.userId}
                        control={
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) =>
                              handleCheckboxChange(
                                people[personIndex].userId,
                                currentQuestionIndex,
                                option.userId,
                                event.target.checked
                              )
                            }
                          />
                        }
                        label={option.name || `Person ${option.userId}`}
                      />
                    );
                  })}
              </FormGroup>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        {currentQuestionIndex === questions.length - 1 && (
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Questions;
