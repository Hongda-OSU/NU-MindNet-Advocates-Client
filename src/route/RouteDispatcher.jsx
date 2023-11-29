import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Header/Layout";
import MindNetLogin from "../components/MindNetLogin/MindNetLogin";
import { useAuthState } from "../utilities/firebaseUtils";
import Homepage from "../components/pages/Homepage";
import Result from "../components/pages/Result";
import Questionnaire from "../components/pages/Questionnaire";

const RouteDispatcher = () => {
  const [user] = useAuthState();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="/nu-mindnet-home" />
            ) : (
              <Navigate replace to="/nu-mindnet-login" />
            )
          }
        />
        <Route path="nu-mindnet-login" element={<MindNetLogin />} />
        <Route
          path="nu-mindnet-home"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
        <Route
          path="questionnaire"
          element={
            <Layout>
              <Questionnaire />
            </Layout>
          }
        />
        <Route
          path="results"
          element={
            <Layout>
              <Result />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
