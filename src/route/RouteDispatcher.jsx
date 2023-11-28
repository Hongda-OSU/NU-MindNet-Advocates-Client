import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "../utilities/firebaseUtils";
import MindNetLogin from "../components/MindNetLogin/MindNetLogin";
import MindNetHome from "../components/MindNetHome/MindNetHome";

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
        <Route path="/nu-mindnet-login" element={<MindNetLogin />} />
        <Route path="/nu-mindnet-home" element={<MindNetHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
