import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const DeletePopup = ({ isOpen, onDeletePlace, onClose, isSend }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeletePlace();
  };
  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText="Да"
      type="submit"
      isSendText="Удаление ..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSend={isSend}
    />
  );
};

export default DeletePopup;
