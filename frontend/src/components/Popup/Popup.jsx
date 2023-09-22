import React from "react";
import "./Popup.css";

const Popup = ({
  name,
  isOpen,
  onClose,
  children,
  card,
  popupTitle,
  successful,
}) => {
  return (
    <section
      className={`popup  ${isOpen === true ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className={`${
          name === "image"
            ? "popup__img"
            : name === "form"
            ? "popup__container"
            : name === "infotooltip"
            ? "popup__container popup__infotooltip"
            : ""
        } `}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="popup__close" type="button" />
        {name === "image" ? (
          <>
            <img
              src={card.link ? card.link : "#"}
              alt={card.name ? card.name : "#"}
              className="popup__image"
            />
            <p className="popup__caption">{card.name}</p>
          </>
        ) : name === "form" ? (
          <h2 className="popup__title">{popupTitle}</h2>
        ) : name === "infotooltip" ? (
          <>
            <div
              className={`${
                successful
                  ? "popup__infotooltip_image"
                  : "popup__infotooltip_image popup__infotooltip_error-image"
              }`}
            />
            <h2 className="popup__title popup__infotooltip_title">
              {successful
                ? "Вы успешно зарегестрировались"
                : "Что-то пошло не так! попробуйте еще раз"}
            </h2>
          </>
        ) : (
          ""
        )}
        {children}
      </div>
    </section>
  );
};

export default Popup;
