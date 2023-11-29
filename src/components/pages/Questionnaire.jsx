import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  List,
  ListItem,
} from "@mui/material";

const Questionnaire = () => {
  const [step, setStep] = useState(1);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [people, setPeople] = useState([
    { name: "", gender: "", age: "" },
    { name: "", gender: "", age: "" },
    { name: "", gender: "", age: "" },
  ]);
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("");

  const handlePersonInputChange = (index, name, value) => {
    const newPeople = [...people];
    newPeople[index][name] = value;
    setPeople(newPeople);
  };

  const handleAddPerson = () => {
    setPeople([...people, { name: "", gender: "", age: "" }]);
  };

  const handleNext = () => {
    if (userName.trim() && userGender) {
      setStep(2);
    } else {
      alert("Please enter your name and select your gender.");
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
      userName,
      userGender,
      people: filteredPeople,
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    // Here you would send jsonData to your backend API
  };

  return (
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
          <Box sx={{ maxWidth: 500 }}>
            <Typography component="h1" variant="h5">
              General Questions
            </Typography>
            <TextField
              label="What is your name?"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">What is your gender?</FormLabel>
              <RadioGroup
                row
                value={userGender}
                onChange={(e) => setUserGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <Typography component="p" variant="body1" sx={{ mt: 2 }}>
              Please fill in the list below (Min of 3 is required).
            </Typography>
            {people.map((person, index) => (
              <TextField
                key={index}
                label={`Person ${index + 1} Name`}
                value={person.name}
                onChange={(e) =>
                  handlePersonInputChange(index, "name", e.target.value)
                }
                margin="normal"
                fullWidth
              />
            ))}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button onClick={handleAddPerson} variant="contained">
                Add Person
              </Button>
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Box>
        )}

        {step === 2 && (
          <React.Fragment>
            <Box
              sx={{
                width: "200px",
                marginRight: "2rem",
                maxHeight: "calc(100vh - 100px)",
                overflow: "auto",
              }}
            >
              <Typography variant="h6">People</Typography>
              <List>
                {people.map((person, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={index === currentPersonIndex}
                    onClick={() => setCurrentPersonIndex(index)}
                  >
                    {person.name || `Person ${index + 1}`}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                Details for{" "}
                {people[currentPersonIndex].name ||
                  `Person ${currentPersonIndex + 1}`}
              </Typography>
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={people[currentPersonIndex].gender}
                  onChange={(e) =>
                    handlePersonInputChange(
                      currentPersonIndex,
                      "gender",
                      e.target.value
                    )
                  }
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                label="Age"
                type="number"
                name="age"
                value={people[currentPersonIndex].age}
                onChange={(e) =>
                  handlePersonInputChange(
                    currentPersonIndex,
                    "age",
                    e.target.value
                  )
                }
                margin="normal"
                fullWidth
              />
            </Box>
          </React.Fragment>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        {step === 2 && (
          <Button onClick={handleBack} variant="contained" sx={{ mr: 2 }}>
            Go Back
          </Button>
        )}
        {currentPersonIndex === people.length - 1 && (
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Questionnaire;
