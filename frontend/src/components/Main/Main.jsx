import React, { useContext } from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Spinner from "../Spinner/Spinner";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Main.css";

const Main = ({
  onCardDelete,
  onCardClick,
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  ...rest
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main__content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{
            backgroundImage: `url(${
              currentUser.avatar ? currentUser.avatar : ""
            })`,
          }}
          onClick={onEditAvatar}
        ></div>
        <div className="profile__bio">
          <div className="profile__info">
            <h1 className="profile__title">
              {currentUser.name ? currentUser.name : ""}
            </h1>

            <button
              className="profile__edit-avatar"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">
            {currentUser.about ? currentUser.about : ""}
          </p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Кнопка добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      {rest.isLoading ? (
        <div className="spinner-element">
          <Spinner />
        </div>
      ) : (
        <section className="elements__list">
          {rest.cards.map((card) => (
            <Card
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              key={card._id}
              card={card}
            />
          ))}
        </section>
      )}
    </main>
  );
};
export default Main;
