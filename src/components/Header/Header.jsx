import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Button color="inherit" onClick={() => navigate("/nu-mindnet-home")}>
          <Typography variant="h6" component="div">
            NU MindNet
          </Typography>
        </Button>
        <Button color="inherit" onClick={() => navigate("/nu-mindnet-login")}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
