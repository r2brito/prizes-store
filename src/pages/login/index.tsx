import React from "react";
import { Container, Box } from "@mui/material";
import LoginForm from "../../sections/login/loginForm";
import "../../styles/_auth.scss";
import Page from "../../components/page";

const Login: React.FC = () => {
  return (
    <Page title="Login">
      <Container maxWidth="sm">
        <Box className="login-page">
          <LoginForm />
        </Box>
      </Container>
    </Page>
  );
};

export default Login;
