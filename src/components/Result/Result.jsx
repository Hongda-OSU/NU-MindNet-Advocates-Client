import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tabs,
  Tab,
} from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Header from "../Header/Header";
import {
  QUESTIONS,
  DESCRIPTIONS,
  CLASSIFICATION_CRITERIA,
  DEGREES,
  CLOSENESS,
  EIGENVECTOR_CENTRALITY,
  RECIPROCITY,
} from "../Data/constant";
import { useLocation } from "react-router-dom";
import "./Result.less";

const Result = () => {
  const levels = ["high", "medium", "low"];
  const location = useLocation();
  const userMapping = location.state?.mapping;
  const imageUrls = location.state?.imageUrls;
  const statistics = location.state?.statistics;

  const [question, setQuestion] = useState(QUESTIONS[0]);
  const [degreeLevel, setDegreeLevel] = useState(statistics["Q1"].degree_level);
  const [closenessLevel, setClosenessLevel] = useState(
    statistics["Q1"].closeness_level
  );
  const [eigenvectorLevel, setEigenvectorLevel] = useState(
    statistics["Q1"].eigen_centrality_level
  );
  const [reciprocityLevel, setReciprocityLevel] = useState(
    statistics["Q1"].reciprocity_level ?? -1
  );
  const [resultIndex, setResultIndex] = useState(0);
  const [resultImage, setResultImage] = useState(imageUrls["Q1"][0]);

  const getLevelDescription = (level, criteria) => criteria[levels[level]];

  const getColorByLevel = (level) => {
    switch (level) {
      case "low":
        return "#28a745";
      case "medium":
        return "#ffc107";
      case "high":
        return "#dc3545";
    }
  };

  const handleQuestionChange = (index) => {
    const questionKey = `Q${index + 1}`;
    setQuestion(QUESTIONS[index]);

    setResultIndex(0);
    setResultImage(imageUrls[questionKey][0]);

    const currentStats = statistics[questionKey];
    setDegreeLevel(currentStats.degree_level);
    setClosenessLevel(currentStats.closeness_level);
    setEigenvectorLevel(currentStats.eigen_centrality_level);
    setReciprocityLevel(currentStats.reciprocity_level ?? -1);
  };

  const handleVisualizationTabChange = (e, index) => {
    e.preventDefault();
    setResultIndex(index);
    const questionIndex = QUESTIONS.findIndex((q) => q === question);
    const questionKey = `Q${questionIndex + 1}`;
    setResultImage(imageUrls[questionKey][index]);
  };

  const userMappingList = Object.entries(userMapping).map(([id, name]) => (
    <div key={id} className="user-mapping-item">
      <span className="user-mapping-id">{`User ID: ${id}`}</span>
      <span className="user-mapping-name">{`Name: ${name}`}</span>
    </div>
  ));

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
                    onClick={() => handleQuestionChange(index)}
                  >
                    <ListItemText
                      className="result-sidebar-list-content"
                      primary={`Question #${index + 1}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <div className="result-sidebar-user-mapping-container">
              <p className="result-sidebar-user-mapping">User Mapping</p>
            </div>
            <div className="user-mapping-container">{userMappingList}</div>
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
                <div className="network-visualization-tab-container">
                  <Tabs
                    value={resultIndex}
                    onChange={handleVisualizationTabChange}
                  >
                    <Tab label="Basic Result" disableRipple />
                    <Tab label="Gender Result" disableRipple />
                    <Tab label="Age Result" disableRipple />
                  </Tabs>
                </div>
                <div className="network-visualization">
                  <PhotoView src={resultImage}>
                    <img
                      className="network-visualization-image"
                      src={resultImage}
                    />
                  </PhotoView>
                  <span className="network-visualization-description">
                    {DESCRIPTIONS[resultIndex]}
                  </span>
                  <span className="network-visualization-user-mapping">
                    Use User Mapping aids in understanding the nodes represented
                    in our visual display!
                  </span>
                </div>
              </div>
              <div className="result-explaination-container">
                <span className="result-explaination-title">
                  Visualization Explaination
                </span>
                <span className="result-explaination-criteria">
                  {CLASSIFICATION_CRITERIA}
                </span>
                <div className="result-explaination-degree-container">
                  <span className="result-explaination-degree-title">
                    <span>Degree </span>
                    <span
                      style={{
                        color: getColorByLevel(levels[degreeLevel]),
                      }}
                    >
                      {levels[degreeLevel]}
                    </span>
                  </span>
                  <span className="result-explaination-degree">
                    {getLevelDescription(degreeLevel, DEGREES)}
                  </span>
                </div>
                <div className="result-explaination-closeness-container">
                  <span className="result-explaination-closeness-title">
                    <span>Closeness </span>
                    <span
                      style={{
                        color: getColorByLevel(levels[closenessLevel]),
                      }}
                    >
                      {levels[closenessLevel]}
                    </span>
                  </span>
                  <span className="result-explaination-closeness">
                    {getLevelDescription(closenessLevel, CLOSENESS)}
                  </span>
                </div>
                <div className="result-explaination-eigenvector-container">
                  <span className="result-explaination-eigenvector-title">
                    <span>Eigenvector Centrality </span>
                    <span
                      style={{
                        color: getColorByLevel(levels[eigenvectorLevel]),
                      }}
                    >
                      {levels[eigenvectorLevel]}
                    </span>
                  </span>
                  <span className="result-explaination-eigenvector">
                    {getLevelDescription(
                      eigenvectorLevel,
                      EIGENVECTOR_CENTRALITY
                    )}
                  </span>
                </div>
                {reciprocityLevel !== -1 && (
                  <div className="result-explaination-reciprocity-container">
                    <span className="result-explaination-reciprocity-title">
                      <span>Reciprocity </span>
                      <span
                        style={{
                          color: getColorByLevel(levels[reciprocityLevel]),
                        }}
                      >
                        {levels[reciprocityLevel]}
                      </span>
                    </span>
                    <span className="result-explaination-reciprocity">
                      {getLevelDescription(reciprocityLevel, RECIPROCITY)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </PhotoProvider>
    </>
  );
};

export default Result;
