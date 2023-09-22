import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LikeButton from "../LikeButton/LikeButton";
import "./Card.css";

const Card = ({ onCardClick, onCardDelete, card }) => {
  const currentUser = useContext(CurrentUserContext);

  const handleClickImg = () => {
    onCardClick(card);
  };

  const handleDeleteCard = () => {
    onCardDelete(card);
  };

  return (
    <article className="card">
      {currentUser._id === card.owner && (
        <button onClick={handleDeleteCard} className="card__busket"></button>
      )}

      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClickImg}
      />
      <div className="card__menu">
        <h2 className="card__title">{card.name}</h2>
        <LikeButton
          likes={card.likes}
          myId={currentUser._id}
          cardId={card._id}
        />
      </div>
    </article>
  );
};
export default Card;
