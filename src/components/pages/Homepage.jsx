import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Box from "@mui/material/Box"; // Import Box component for layout

const Homepage = () => {
  const navigate = useNavigate();
  const hasResults = false; // Replace with actual logic to check for results

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
        {hasResults ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/result")}
            sx={{ padding: "10px 30px", fontSize: "1.25rem" }}
          >
            Go to Results
          </Button>
        ) : (
          <Tooltip
            title="No results available, please take the questionary first"
            placement="bottom"
          >
            <span>
              <Button
                variant="contained"
                disabled
                sx={{
                  padding: "10px 30px",
                  fontSize: "1.25rem",
                  backgroundColor: "grey",
                }}
              >
                View Results
              </Button>
            </span>
          </Tooltip>
        )}
      </Box>
    </>
  );
};

export default Homepage;
