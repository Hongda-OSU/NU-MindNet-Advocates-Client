import { useState, useEffect } from "react";
import { firebaseSignOut } from "../../utilities/firebaseUtils";
import { useNavigate } from "react-router-dom";
import "./MindNetHome.less";

const MindNetHome = () => {
  const navigate = useNavigate();

  const signout = () => {
    firebaseSignOut()
      .then(() => {
        navigate("/nu-mindnet-login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mindnet-home">
      <button onClick={signout}>Sign Out</button>
    </div>
  );
};

export default MindNetHome;
