import { useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Header from "../Header/Header";
import "./Result.less";

const question_data = [
  "Imagine it's a Friday night and You are planning a fun party. Who do you think would be their top pick for an invite?",
  "Think of a casual dinner at the dining hall. Who would You most likely choose to share this meal with?",
  "When it comes to academic advice and support, who is Your go-to person?",
  "In times of personal challenges or need for advice, who is Your trusted confidante?",
];

const popularity_data = {
  labels: ["User1", "User2", "User3", "User4", "User5", "User6"],
  datasets: [
    {
      label: "# of Connections",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

const Result = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [questionData, setQuestionData] = useState(question_data[0]);
  const [popularityData, setPopularityData] = useState(popularity_data);

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
              {question_data.map((_, index) => (
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
                    onClick={() => setQuestionData(question_data[index])}
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
                Question{" "}
                {question_data.findIndex((q) => q === questionData) + 1}{" "}
              </span>
              <span className="result-question-content">{questionData}</span>
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
                <span className="network-visualization-explain">
                  Based on the statistics (degree, closeness, eigenvector
                  centrality, and reciprocity), we can calculate the values for
                  these statistics and the rankings for all nodes in the
                  network. We classify the level of centrality based on the
                  percentile of the user node. Specifically, if the user ranks
                  top ⅓, we classify it as high. Similar for medium and low.
                </span>
              </div>
              <div className="popularity-visualization-container">
                <span className="popularity-visualization-title">
                  Popularity Visualization Result
                </span>
                <div className="popularity-visualization">
                  <div className="popularity-visualization-doughnut">
                    <Doughnut data={popularityData} />
                  </div>
                  <span className="popularity-visualization-description">
                    Academic collaboration network visualization based on gender
                  </span>
                </div>
                <span className="popularity-visualization-explain">
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
