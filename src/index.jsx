import React from "react";
import ReactDOM from "react-dom/client";
import RouteDispatcher from "./route/RouteDispatcher";
// import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.less";

const root = document.getElementById("root");
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <React.StrictMode>
    <RouteDispatcher />
  </React.StrictMode>
);
