import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import MindNetLogin from "../components/MindNetLogin/MindNetLogin";

const RouteDispatcher = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MindNetLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
