import React from "react";
import Popup from "../Popup/Popup";

const InfoTooltip = ({ isOpen, successful, onClose }) => {
  return (
    <Popup
      isOpen={isOpen}
      successful={successful}
      onClose={onClose}
      name="infotooltip"
    />
  );
};

export default InfoTooltip;
