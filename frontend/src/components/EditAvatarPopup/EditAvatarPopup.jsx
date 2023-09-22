import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useValidationForm } from "../../utils/useValidationForm";
import Input from "../Input/Input";

const EditAvatarPopup = ({ isSend, isOpen, onClose, onUpdateAvatar }) => {
  const { value, error, isValid, isInputValid, handleChange, resetInput } =
    useValidationForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(value, handleClose);
  };

  const handleClose = () => {
    resetInput();
    onClose();
  };

  return (
    <PopupWithForm
      name="my-modal-avatar"
      title="Обновить аватар"
      buttonText="Обновить"
      isSendText="Обновление..."
      type="submit"
      isOpen={isOpen}
      isValid={isValid}
      isSend={isSend}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Input
        required
        id="link-avatar"
        name="avatar"
        type="url"
        isInputValid={isInputValid.avatar}
        placeholder="Ссылка на картинку"
        value={value.avatar}
        onChange={handleChange}
        disabled={isSend}
        error={error.avatar}
      />
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
