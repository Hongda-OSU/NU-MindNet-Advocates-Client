import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "../utilities/firebaseUtils";
import Login from "../components/Login/Login";
import Homepage from "../components/pages/Homepage";
import Questionnaire from "../components/pages/Questionnaire";
import Result from "../components/Result/Result";

const RouteDispatcher = () => {
  const [user] = useAuthState();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="home" />
            ) : (
              <Navigate replace to="login" />
            )
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Homepage />} />
        <Route path="questionnaire" element={<Questionnaire />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
