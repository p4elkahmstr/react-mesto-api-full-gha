import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useValidationForm } from "../../utils/useValidationForm";
import Input from "../Input/Input";

const AddPlacePopup = ({ isOpen, isSend, onClose, onAddPlace }) => {
  const { value, error, isValid, isInputValid, handleChange, resetInput } =
    useValidationForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(value, handleClose);
  };

  const handleClose = () => {
    resetInput();
    onClose();
  };

  return (
    <PopupWithForm
      name="my-modal-cread"
      title="Новое место"
      buttonText="Сохранить"
      isSendText="Сохранение..."
      type="submit"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSend={isSend}
      isValid={isValid}
    >
      <Input
        required
        id="name-cread"
        name="name"
        type="text"
        isInputValid={isInputValid.name}
        placeholder="Название картинки"
        minLength={2}
        maxLength={30}
        value={value.name}
        onChange={handleChange}
        disabled={isSend}
        error={error.name}
      />
      <Input
        required
        id="link-cread"
        name="link"
        type="url"
        isInputValid={isInputValid.link}
        placeholder="Ссылка на картинку"
        value={value.link}
        onChange={handleChange}
        disabled={isSend}
        error={error.link}
      />
    </PopupWithForm>
  );
};
export default AddPlacePopup;
