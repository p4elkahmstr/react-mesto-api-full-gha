import React from "react";
import "./Form.css";

const Form = ({
  name,
  buttonText,
  type,
  isSend,
  isSendText,
  children,
  onSubmit,
  isValid,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={
        name === "signin" || name === "signup" ? "form form__login" : "form"
      }
      name={name}
      noValidate
    >
      {children}
      {name === "signin" || name === "signup" ? (
        <button
          className={`form__submit form__submit_login  ${
            isValid ? "" : "form__submit_invalid form__submit_invalid-login"
          } `}
          type={type}
          disabled={isSend}
        >
          {isSend ? isSendText : buttonText}
        </button>
      ) : (
        <button
          className={`form__submit  ${isValid ? "" : "form__submit_invalid"} `}
          type={type}
          disabled={isSend}
        >
          {isSend ? isSendText : buttonText}
        </button>
      )}
    </form>
  );
};

export default Form;
