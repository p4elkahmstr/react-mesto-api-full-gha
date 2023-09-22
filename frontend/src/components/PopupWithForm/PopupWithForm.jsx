import React from "react";
import Form from "../Form/Form";
import Popup from "../Popup/Popup";

const PopupWithForm = ({
  isOpen,
  isSend,
  onClose,
  onSubmit,
  isValid = true,
  ...rest
}) => {
  return (
    <Popup
      name="form"
      isOpen={isOpen}
      onClose={onClose}
      popupTitle={rest.title}
    >
      <Form
        children={rest.children}
        buttonText={rest.buttonText}
        isSend={isSend}
        isSendText={rest.isSendText}
        onSubmit={onSubmit}
        isValid={isValid}
        type={rest.type}
      />
    </Popup>
  );
};
export default PopupWithForm;
