import React from "react";
import Popup from "../Popup/Popup";

const ImagePopup = ({ isOpen, card, onClose }) => {
  return <Popup onClose={onClose} isOpen={isOpen} name="image" card={card} />;
};
export default ImagePopup;
