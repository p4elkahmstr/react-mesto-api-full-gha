import React, { useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useValidationForm } from "../../utils/useValidationForm";

const EditProfilePopup = ({ isOpen, isSend, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const {
    value,
    error,
    isValid,
    isInputValid,
    handleChange,
    resetInput,
    setValueInput,
  } = useValidationForm();

  useEffect(() => {
    setValueInput({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, setValueInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(value, handleClose);
  };

  const handleClose = () => {
    resetInput({ name: currentUser.name, about: currentUser.about });
    onClose();
  };

  return (
    <PopupWithForm
      name="my-modal-edit"
      title="Редактировать профиль"
      isSendText="Сохранение..."
      buttonText="Сохранить"
      type="submit"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSend={isSend}
      isValid={isValid}
    >
      <Input
        required
        id="name-edit"
        name="name"
        type="text"
        isInputValid={isInputValid.name}
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        value={value.name}
        onChange={handleChange}
        disabled={isSend}
        error={error.name}
      />
      <Input
        required
        id="about-edit"
        name="about"
        type="text"
        isInputValid={isInputValid.about}
        placeholder="Обо мне"
        minLength={2}
        maxLength={200}
        value={value.about}
        onChange={handleChange}
        disabled={isSend}
        error={error.about}
      />
    </PopupWithForm>
  );
};
export default EditProfilePopup;
