import { useState, useEffect } from "react";
import {
  signInWithGoogle,
  signInWithEmailPassword,
  useAuthState,
} from "../../utilities/firebaseUtils";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./MindNetLogin.less";

const pageContents = [
  {
    slogan: "Leveraging Data Analytics to Transform Mental Health Care and Patient Experiences",
    imageUrl:
      "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgData%20analysis-pana.svg",
  },
  {
    slogan: "Empowering Therapists with Insights for Enhanced Patient Care and Holistic Wellness",
    imageUrl:
      "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgasdadasd.svg",
  },
  {
    slogan: "Navigating Social Interactions to Promote Greater Wellness and Mental Health",
    imageUrl:
      "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgEthnic%20friendship-cuate.svg",
  },
];

const PreloadImages = () => {
  useEffect(() => {
    pageContents.forEach((item) => {
      const img = new Image();
      img.src = item.imageUrl;
    });
  }, []);
};

const MindNetLogin = () => {
  PreloadImages();

  const [currentPage, setCurrentPage] = useState(0);
  const [fade, setFade] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();
  const fillInTestAccount = () => {
    setEmail("test@example.com");
    setPassword("testpassword");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % pageContents.length);
        setFade(false);
      }, 500);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/nu-mindnet-home");
    }
  }, [user, navigate]);

  return (
    <div className="mindnet-login">
      <div className="mindnet-login-container">
        <section className="mindnet-login-section">
          <div className="mindnet-login-icon-container">
            <img
              className="mindnet-login-icon"
              src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgicon.svg"
            />
          </div>
          <div className="mindnet-login-title-container">
            <span className="mindnet-login-title-text purple">N</span>
            <span className="mindnet-login-title-text purple last">U</span>
            <span className="mindnet-login-title-text">M</span>
            <span className="mindnet-login-title-text">I</span>
            <span className="mindnet-login-title-text">N</span>
            <span className="mindnet-login-title-text">D</span>
            <span className="mindnet-login-title-text">N</span>
            <span className="mindnet-login-title-text">E</span>
            <span className="mindnet-login-title-text">T</span>
          </div>
          <div className="mindnet-login-content-container">
            <FormControl className="mindnet-login-email-container">
              <OutlinedInput
                className="mindnet-login-email"
                type={"text"}
                value={email}
                placeholder={"Enter Email"}
                sx={{
                  "& fieldset": { border: "none" },
                }}
                onChange={(e) => setEmail(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <AccountCircleIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className="mindnet-login-password-container">
              <OutlinedInput
                className="mindnet-login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder={"Enter Password"}
                sx={{
                  "& fieldset": { border: "none" },
                }}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className="mindnet-login-test-container">
              <Button
                variant="text"
                className="mindnet-login-test-button"
                onClick={fillInTestAccount}
              >
                Use Test Account
              </Button>
            </div>
            <Button
              variant="contained"
              className="mindnet-login-sign-in-button"
              onClick={() => signInWithEmailPassword(email, password)}
            >
              Sign In
            </Button>
            <span className="mindnet-login-continue-with-text">
              Or continue with
            </span>
            <div className="mindnet-login-other-sign-in-container">
              <Button
                variant="contained"
                className="mindnet-login-google-sign-in-button"
                onClick={signInWithGoogle}
              >
                <img
                  src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgGoogle.svg"
                  className="login-google-icon"
                />
              </Button>
            </div>
          </div>
        </section>
        <section className="mindnet-slogan-section">
          <div className="mindnet-fuzzy-glass-section">
            <p
              className={`mindnet-fuzzy-glass-slogan ${
                fade ? "hidden-content" : ""
              }`}
            >
              {pageContents[currentPage].slogan}
            </p>
            <img
              className={fade ? "hidden-content" : ""}
              src={pageContents[currentPage].imageUrl}
            />
            <div className="mindnet-fuzzy-glass-three-dots">
              {pageContents.map((_, index) => (
                <span
                  key={index}
                  className={`mindnet-fuzzy-glass-dot ${
                    index === currentPage ? "active" : ""
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MindNetLogin;
