import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import { useUser } from "../context/UserContext";

const SignUpForm = () => {
  const history = useHistory();

  const [displayError, setDisplayError] = useState(false);

  const { user, createUser, createUserError, createUserLoading } = useUser();

  useEffect(() => {
    if (user?.id) {
      history.push("/");
    }
  }, [user?.id, history]);

  useEffect(() => {
    setDisplayError(!!createUserError?.message);
  }, [createUserError?.message]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(createUser)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            required
            label="Full Name"
            type="text"
            error={errors.name}
            helperText={errors.name && "A name is required"}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            required
            label="Email"
            type="email"
            error={errors.email}
            helperText={errors.email && "A valid email address is required"}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            required
            label="Password"
            type="password"
            error={errors.password}
            helperText={
              errors.password
                ? "A password is required"
                : "PASSWORDS ARE STORED IN PLAIN TEXT, DO NOT USE A MEANINGFUL PASSWORD"
            }
            {...field}
          />
        )}
      />
      <LoadingButton
        variant="contained"
        loading={createUserLoading}
        type="submit"
      >
        Start Shopping
      </LoadingButton>

      {displayError && createUserError?.message && (
        <Typography variant="body1" color="error">
          {createUserError.message}
        </Typography>
      )}
    </Form>
  );
};

export default SignUpForm;

const Form = styled.form`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
`;
