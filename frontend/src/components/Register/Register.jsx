import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import { useValidationForm } from "../../utils/useValidationForm";
import Input from "../Input/Input";

const Register = ({ isSend, onSubmit }) => {
  const { value, error, isValid, isInputValid, handleChange, resetInput } =
    useValidationForm();
  const handleRegister = (e) => {
    e.preventDefault();
    onSubmit(value, resetInput);
  };
  return (
    <AuthPage
      name="signup"
      type="submit"
      isValid={isValid}
      isSend={isSend}
      onSubmit={handleRegister}
    >
      <Input
        required
        id="email-register"
        name="email"
        type="email"
        isInputValid={isInputValid.email}
        placeholder="Email"
        value={value.email}
        onChange={handleChange}
        disabled={isSend}
        error={error.email}
        minLength={2}
        maxLength={50}
      />
      <Input
        required
        id="password-register"
        name="password"
        type="password"
        isInputValid={isInputValid.password}
        placeholder="Пароль"
        value={value.password}
        onChange={handleChange}
        disabled={isSend}
        error={error.password}
        minLength={2}
        maxLength={30}
      />
    </AuthPage>
  );
};

export default Register;
