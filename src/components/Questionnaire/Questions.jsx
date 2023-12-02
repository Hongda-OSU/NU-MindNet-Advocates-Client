import React from "react";
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
  currentQuestionIndex,
  setCurrentQuestionIndex,
  handleBack,
  handleSubmit,
}) => {
  // Placeholder function for handling checkbox changes
  const handleCheckboxChange = (
    personIndex,
    questionIndex,
    selectedPersonIndex
  ) => {
    // Logic to handle checkbox change
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
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
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
                  .split("this person")
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

              <FormGroup>
                {people
                  .filter((_, filterIndex) => filterIndex !== personIndex)
                  .map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      control={
                        <Checkbox
                          onChange={() =>
                            handleCheckboxChange(
                              personIndex,
                              currentQuestionIndex,
                              optionIndex
                            )
                          }
                        />
                      }
                      label={option.name || `Person ${optionIndex + 1}`}
                    />
                  ))}
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
