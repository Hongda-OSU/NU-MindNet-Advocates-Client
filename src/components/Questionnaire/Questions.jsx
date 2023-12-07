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
  Modal,
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
  submitSuccess,
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handlePreSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    handleSubmit(); // Call the passed handleSubmit function
  };

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
          <Button onClick={handlePreSubmit} variant="contained">
            Submit
          </Button>
        )}
      </Box>
      <Modal
        open={submitSuccess}
        onClose={() => {}} // Optionally handle close event
        aria-labelledby="submission-success-modal"
        aria-describedby="submission-success-message"
      >
        <Box
          sx={{
            ...modalStyle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            id="submission-success-modal"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", width: "100%" }}
          >
            Submission Successful!
          </Typography>
          <Typography
            id="submission-success-message"
            sx={{ mt: 2, textAlign: "center", width: "100%" }}
          >
            Go back to homepage to check out the result.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }} // justifyContent and alignItems removed
            onClick={() => (window.location.href = "/")}
          >
            Go Back to Homepage
          </Button>
        </Box>
      </Modal>

      <Modal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        aria-labelledby="confirm-submission-modal"
        aria-describedby="confirm-submission-message"
      >
        <Box sx={modalStyle}>
          {/* <Typography
            id="confirm-submission-modal"
            style={{ textAlign: "center" }}
            variant="h6"
            component="h2"
          >
            Are you sure?
          </Typography> */}
          <Typography id="confirm-submission-message" sx={{ mt: 2 }}>
            Please make sure that you have filled in all the information and
            ready to submit.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              justifyContent: "center",
              alignItems: "center",
              gap: 1, // You can use gap to set a consistent space between items
            }}
          >
            <Button
              variant="contained"
              sx={{ mt: 2 }} // Removed mr: 2 to reduce space between buttons
              onClick={handleConfirmSubmit}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setShowConfirmation(false)}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Questions;
