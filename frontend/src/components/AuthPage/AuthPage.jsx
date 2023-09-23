import React from "react";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = ({ name, type, children, isValid, onSubmit, isSend }) => {
  return (
    <section className="login">
      <h2 className="login__title">
        {name === "signin" ? "Вход" : "Регистрация"}
      </h2>
      <Form
        children={children}
        name={name}
        buttonText={name === "signin" ? "Войти" : "Регистрация"}
        isSendText={name === "signin" ? "Вход..." : "Регистрация..."}
        isValid={isValid}
        isSend={isSend}
        onSubmit={onSubmit}
        type={type}
      />
      {name === "signup" ? (
        <p className="login__subtitle">
          Уже зарегестрированны?
          <Link to="/signin" className="login__subtitle_link">
            Войти
          </Link>
        </p>
      ) : (
        ""
      )}
    </section>
  );
};

export default AuthPage;
