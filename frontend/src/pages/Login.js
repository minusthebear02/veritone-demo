import React, { useState } from "react";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Login = () => {
  const [isSignup, setIsSignup] = useState(0);

  const handleTabChange = (event, newValue) => {
    setIsSignup(newValue);
  };

  return (
    <Container>
      <Paper elevation={3} className="form-container">
        <Typography variant="h4" align="center">
          Welcome to your Shopping List
        </Typography>
        <Tabs
          value={isSignup}
          onChange={handleTabChange}
          aria-label="tab between sign up and log in"
        >
          <Tab className="tab" label="Log In" />
          <Tab className="tab" label="Sign Up" />
        </Tabs>
        {isSignup ? <SignUpForm /> : <LoginForm />}
      </Paper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-container {
    width: 80%;
    max-width: 500px;
    padding: 25px;

    h4 {
      margin-bottom: 15px;
    }
  }

  .tab {
    flex: 1;
    font-weight: 700;
  }
`;
