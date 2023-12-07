import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Box from "@mui/material/Box"; // Import Box component for layout

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        flexDirection="row"
        gap={15}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/questionnaire")}
          sx={{ padding: "10px 30px", fontSize: "1.25rem" }} // Adjust padding and font size as needed
        >
          Take Questionary
        </Button>
       
      </Box>
    </>
  );
};

export default Homepage;
