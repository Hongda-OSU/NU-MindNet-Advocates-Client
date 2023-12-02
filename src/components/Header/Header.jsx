import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { firebaseSignOut } from "../../utilities/firebaseUtils";

const Header = () => {
  const navigate = useNavigate();
  
  const signout = () => {
    firebaseSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Button color="inherit" onClick={() => navigate("/home")}>
          <Typography variant="h6" component="div">
            NU MindNet
          </Typography>
        </Button>
        <Button color="inherit" onClick={signout}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
