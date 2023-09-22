import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";

const ProtectedHome = ({ linkText, userEmail, name, ...props }) => {
  return (
    <>
      <Header linkText={linkText} userEmail={userEmail} />
      <Main name={name} {...props} />
    </>
  );
};

export default ProtectedHome;
