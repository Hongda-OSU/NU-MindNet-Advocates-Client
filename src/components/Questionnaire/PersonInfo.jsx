import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const PersonInfo = ({
  people,
  handleNext,
  handleAddPerson,
  handleDeletePerson,
  handlePersonInputChange,
}) => {
  // Placeholder for the result page
  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography component="h1" variant="h5">
        General Questions
      </Typography>
      <TextField
        label="What is your name?"
        value={people[0].name}
        onChange={(e) => handlePersonInputChange(0, "name", e.target.value)}
        margin="normal"
        fullWidth
      />
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={8}>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">What is your gender?</FormLabel>
            <RadioGroup
              row
              value={people[0].gender}
              onChange={(e) =>
                handlePersonInputChange(0, "gender", e.target.value)
              }
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Age"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 150 } }}
            value={people[0].age}
            onChange={(e) => {
              const newAge = e.target.value;
              // Check if the newAge is within the 0-150 range
              if (newAge >= 0 && newAge <= 150) {
                handlePersonInputChange(0, "age", newAge);
              }
            }}
            margin="normal"
            sx={{ width: "50%" }} // Make the text field shorter
          />
        </Grid>
      </Grid>
      <Typography component="p" variant="body1" sx={{ mt: 2 }}>
        Please fill in the list below (Min of 3 is required).
      </Typography>
      {people.slice(1).map((person, index) => (
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <TextField
              label={`Person ${index + 1} Name`}
              value={person.name}
              onChange={(e) =>
                handlePersonInputChange(index + 1, "name", e.target.value)
              }
              margin="normal" // Make the text field shorter
              fullWidth
            />
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={8}>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">
                    Gender for Person {index + 1}
                  </FormLabel>
                  <RadioGroup
                    row
                    value={person.gender}
                    onChange={(e) =>
                      handlePersonInputChange(
                        index + 1,
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
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Age"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 150 } }}
                  value={person.age}
                  onChange={(e) => {
                    const newAge = e.target.value;
                    // Check if the newAge is within the 0-150 range
                    if (newAge >= 0 && newAge <= 150) {
                      handlePersonInputChange(index+1, "age", newAge);
                    }
                  }}
                  margin="normal"
                  sx={{ width: "50%" }} // Make the text field shorter
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Button onClick={handleAddPerson} variant="contained">
            Add Person
          </Button>
          <Button onClick={handleDeletePerson} variant="contained">
            Delete Person
          </Button>
        </Box>
        <Button onClick={handleNext} variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PersonInfo;
