import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./LikeButton.css";

const LikeButton = ({ likes, myId, cardId }) => {
  const [isLiked, setIsLiked] = useState(false);

  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLiked(likes.some((i) => i === myId));
  }, [likes, myId]);

  const handleCardLike = () => {
    if (isLiked) {
      api
        .deleteLike(cardId, localStorage.token)
        .then((newCard) => {
          setIsLiked(false);
          setCount(newCard.likes.length);
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`));
    } else {
      api
        .addLike(cardId, localStorage.token)
        .then((newCard) => {
          setIsLiked(true);
          setCount(newCard.likes.length);
        })
        .catch((err) => console.error(`Ошибка при постановки лайка${err}`));
    }
  };
  return (
    <div>
      <button
        onClick={handleCardLike}
        className={`like__button ${isLiked ? "like__button_active" : ""}`}
        type="button"
        aria-label="Кнопка лайк"
      ></button>
      <p className="like__counter">{count}</p>
    </div>
  );
};
export default LikeButton;
