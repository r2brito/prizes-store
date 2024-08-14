import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Typography, Box } from "@mui/material";

import FormProvider from "../../components/hook-form/FormProvider";
import LoginSchema from "../../validations/login.scheme";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/_auth.scss";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(LoginSchema)
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;

    await login(email, password);
  };

  return (
    <Box className="login-form">
      <Typography
        variant="h4"
        className="login-form__title"
      >
        Login
      </Typography>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          className="login-form__input"
          {...methods.register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          className="login-form__input"
          {...methods.register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="login-form__button"
          disabled={isSubmitting}
        >
          Entrar
        </Button>
      </FormProvider>
      <Typography
        variant="body2"
        className="login-form__forgot-password"
      >
        <a href="/#">Esqueceu sua senha?</a>
      </Typography>
    </Box>
  );
};

export default LoginForm;
