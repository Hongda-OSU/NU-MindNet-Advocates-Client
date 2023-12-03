import { useState } from "react";
import Header from "../Header/Header";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "./Result.less";

const questionData = [
  "Imagine it's a Friday night and You are planning a fun party. Who do you think would be their top pick for an invite?",
  "Think of a casual dinner at the dining hall. Who would You most likely choose to share this meal with?",
  "When it comes to academic advice and support, who is Your go-to person?",
  "In times of personal challenges or need for advice, who is Your trusted confidante?",
];

const Result = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    content: questionData[0],
    index: 0,
  });

  return (
    <>
      <Header />
      <div className="result">
        <section className="result-sidebar">
          <div className="result-sidebar-title-container">
            <p className="result-sidebar-title">My Results</p>
          </div>
          <List>
            {questionData.map((_, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  marginBottom: "5px",
                }}
              >
                <ListItemButton
                  disableGutters
                  sx={{
                    backgroundColor: "f0ffff",
                    boxShadow: "0 2px 7px rgba(0, 0, 0, 0.1)",
                    margin: "0 10px 0 10px",
                  }}
                  onClick={() =>
                    setCurrentQuestion({
                      content: questionData[index],
                      index: index,
                    })
                  }
                >
                  <ListItemText
                    className="result-sidebar-list-content"
                    primary={`Question #${index + 1}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </section>
        <section className="result-container">
          <div className="result-question-content-container">
            <span className="result-question-number">
              Question {currentQuestion.index + 1}{" "}
            </span>
            <span className="result-question-content">
              {currentQuestion.content}
            </span>
          </div>
          <div className="result-network-visualization-container">
            <span className="network-visualization-title">
              Network Visualization Result
            </span>
            <div className="network-visualization">
              <div className="network-visualization-image-container">
                <img
                  className="network-visualization-image"
                  src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgtest_directed_small.jpg"
                />
                <span className="network-visualization-description">
                  Academic collaboration network visualization based on gender
                </span>
              </div>
              <div className="result-network-explain-container"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Result;
