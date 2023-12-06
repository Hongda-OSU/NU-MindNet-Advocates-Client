import { useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Header from "../Header/Header";
import {
  QUESTIONS,
  CLASSIFICATION_CRITERIA,
  DEGREES,
  CLOSENESS,
  EIGENVECTOR_CENTRALITY,
  RECIPROCITY,
} from "../Data/constant";
import "./Result.less";

const Result = () => {
  const [question, setQuestion] = useState(QUESTIONS[0]);
  const [degreeLevel, setDegreeLevel] = useState(0);
  const [closenessLevel, setClosenessLevel] = useState(0);
  const [eigenvectorLevel, setEigenvectorLevel] = useState(0);
  const [reciprocityLevel, setReciprocityLevel] = useState(0);

  const getLevelDescription = (level, criteria) => {
    const levels = ["high", "medium", "low"];
    return criteria[levels[level]];
  };

  return (
    <>
      <PhotoProvider>
        <Header />
        <div className="result">
          <section className="result-sidebar">
            <div className="result-sidebar-title-container">
              <p className="result-sidebar-title">My Results</p>
            </div>
            <List>
              {QUESTIONS.map((_, index) => (
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
                    onClick={() => setQuestion(QUESTIONS[index])}
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
                Question {QUESTIONS.findIndex((q) => q === question) + 1}{" "}
              </span>
              <span className="result-question-content">{question}</span>
            </div>
            <div className="result-visualization-container">
              <div className="network-visualization-container">
                <span className="network-visualization-title">
                  Network Visualization Result
                </span>
                <div className="network-visualization">
                  <PhotoView src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgtest_directed_small.jpg">
                    <img
                      className="network-visualization-image"
                      src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgtest_directed_small.jpg"
                    />
                  </PhotoView>
                  <span className="network-visualization-description">
                    Academic collaboration network visualization based on gender
                  </span>
                </div>
              </div>
              <div className="result-explaination-container">
                <span className="result-explaination-title">
                  Visualization Explaination
                </span>
                <span className="network-visualization-explain">
                  Based on the statistics (degree, closeness, eigenvector
                  centrality, and reciprocity), we can calculate the values for
                  these statistics and the rankings for all nodes in the
                  network. We classify the level of centrality based on the
                  percentile of the user node. Specifically, if the user ranks
                  top ⅓, we classify it as high. Similar for medium and low.
                </span>
                <span className="network-visualization-explain">
                  Based on the statistics (degree, closeness, eigenvector
                  centrality, and reciprocity), we can calculate the values for
                  these statistics and the rankings for all nodes in the
                  network. We classify the level of centrality based on the
                  percentile of the user node. Specifically, if the user ranks
                  top ⅓, we classify it as high. Similar for medium and low.
                </span>
                <span className="network-visualization-explain">
                  Based on the statistics (degree, closeness, eigenvector
                  centrality, and reciprocity), we can calculate the values for
                  these statistics and the rankings for all nodes in the
                  network. We classify the level of centrality based on the
                  percentile of the user node. Specifically, if the user ranks
                  top ⅓, we classify it as high. Similar for medium and low.
                </span>
              </div>
            </div>
          </section>
        </div>
      </PhotoProvider>
    </>
  );
};

export default Result;
