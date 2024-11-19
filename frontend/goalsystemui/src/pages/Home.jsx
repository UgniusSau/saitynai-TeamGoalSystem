import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { UserContext } from "../services/authProvider";
import "../styles/Home.css";
import { getUserName } from "../helpers/getUserNameHelper";

const Home = () => {
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const handleLoginClick = (event) => {
    navigate("/login");
  };

  const handleRegisterClick = (event) => {
    navigate("/register");
  };

  return (
    <>
      {user?.isLoggedIn ? (
        <>
          <div className="content">
            <h1>Welcome back, {getUserName(user)}!</h1>
            <p>We're glad to see you again. Here's what's new:</p>

            <section style={{ width: "100%", maxWidth: "800px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    width: "200px",
                    boxSizing: "border-box",
                  }}
                >
                  <h3>Goal updates</h3>
                  <p>
                    Stay updated with the latest members goal updates and
                    remember to check them out.
                  </p>
                </div>

                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    width: "200px",
                    boxSizing: "border-box",
                  }}
                >
                  <h3>Team updates</h3>
                  <p>
                    Access all teams to stay tuned with the latest organisation
                    structure.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          <div className="content">
            <h1>Hello! Welcome to Team Goal System!</h1>
            <div className="logo-container">
              <img
                src={`${process.env.PUBLIC_URL}/photo.svg`}
                alt="Goal system logo"
                className="responsive-image"
              />
            </div>
            <div className="button-group">
              <Button
                variant="contained"
                onClick={handleLoginClick}
                className="login-button"
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={handleRegisterClick}
                className="register-button"
              >
                Register
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
