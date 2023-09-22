import React from "react";
import "./Input.css";

const Input = ({
  id,
  name,
  type,
  isInputValid,
  value,
  error,
  minLength,
  maxLength,
  onChange,
  isSend,
  placeholder,
}) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        className={`${
          name === "email" || name === "password"
            ? "input input__login"
            : "input"
        }         ${
          isInputValid === undefined || isInputValid ? "" : "input__error"
        }`}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value ? value : ""}
        onChange={onChange}
        disabled={isSend}
      />
      <span
        className={`${!isInputValid ? "input__text-error" : ""}`}
        id="name-edit-error"
      >
        {error}
      </span>
    </>
  );
};

export default Input;
