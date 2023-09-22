import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import ProtectedHome from "./ProtectedHome/ProtectedHome";
import Footer from "./Footer/Footer";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import DeletePopup from "./DeletePopup/DeletePopup";
import InfoTooltip from "./InfoToolTip/InfoToolTip";
import api from "../utils/api";
import auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Register from "./Register/Register";
import Login from "./Login/Login";

const App = () => {
  //popup states
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  //result states
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  const [successful, setSuccessful] = useState(false);
  //status states
  const [isSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  //user info states
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  //card states
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState({});

  const navigate = useNavigate();

  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isDeletePopupOpen ||
    isImagePopupOpen ||
    isResultPopupOpen;

  const closeAllPopups = useCallback(() => {
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsResultPopupOpen(false);
  }, []);

  const handleClosePopup = useCallback(() => {
    closeAllPopups();
  }, [closeAllPopups]);

  useEffect(() => {
    const closePopupByEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", closePopupByEsc);
      return () => {
        document.removeEventListener("keydown", closePopupByEsc);
      };
    }
  }, [isOpen, closeAllPopups]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.getUserInfo(localStorage.token),
      api.getCards(localStorage.token),
    ])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
        setIsLoading(false);
      })
      .catch((err) => console.error(`Ошибка при загрузки данных: ${err}`));
  }, []);

  useEffect(() => {
    if (localStorage.token) {
      auth
        .getUsersMe(localStorage.token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error(`Ошибка при повторном входе:${err}`);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleRegister = (data, resetInput) => {
    setIsSend(true);
    auth
      .signup(data)
      .then(() => {
        setIsResultPopupOpen(true);
        setSuccessful(true);
        resetInput();
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setSuccessful(false);
        console.error(`Ошибка при регистрации: ${err}`);
      })
      .finally(() => {
        setIsSend(false);
      });
  };

  const handleLogin = (data, resetInput) => {
    setIsSend(true);
    auth
      .signin(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setUserEmail(data.email);
        resetInput();
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setSuccessful(false);
        console.error(`Ошибка при авторизации: ${err}`);
      })
      .finally(() => {
        setIsSend(false);
      });
  };

  const handleCardDelete = () => {
    setIsSend(true);
    api
      .deleteCardByServer(deleteCardId, localStorage.token)
      .then(() => {
        setCards(
          cards.filter((c) => {
            return c._id !== deleteCardId._id;
          })
        );
        handleClosePopup();
        setIsSend(false);
      })
      .catch((err) => console.error(`Ошибка при удалении карточки: ${err}`))
      .finally(() => setIsSend(false));
  };

  const handleUpdateUser = (data, handleClose) => {
    setIsSend(true);
    api
      .setUserInfo(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        handleClose();
        setIsSend(false);
      })
      .catch((err) =>
        console.error(`Ошибка при изменении данных профиля: ${err}`)
      )
      .finally(() => setIsSend(false));
  };

  const handleUpdateAvatar = (data, handleClose) => {
    setIsSend(true);
    api
      .setUserAvatar(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        handleClose();
      })
      .catch((err) => console.error(`Ошибка при изменении аватарки: ${err}`))
      .finally(() => setIsSend(false));
  };

  const handleAddPlaceSubmit = (data, handleClose) => {
    setIsSend(true);
    api
      .addCardByServer(data, localStorage.token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClose();
      })
      .catch((err) =>
        console.error(`Ошибка при добавлении нового места: ${err}`)
      )
      .finally(() => setIsSend(false));
  };

  const handleCardClick = (data) => {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  };

  const handleAddPlacePopup = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarPopup = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfilePopup = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleDeletePlace = (card) => {
    setDeleteCardId(card);
    setIsDeletePopupOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={ProtectedHome}
              onCardDelete={handleDeletePlace}
              onCardClick={handleCardClick}
              onAddPlace={handleAddPlacePopup}
              onEditAvatar={handleEditAvatarPopup}
              onEditProfile={handleEditProfilePopup}
              isLoading={isLoading}
              isSend={isSend}
              userEmail={userEmail}
              loggedIn={loggedIn}
              cards={cards}
              name="main"
              linkText="Выход"
            />
          }
        />
        <Route
          path="sign-in"
          element={
            <>
              <Header name="signin" linkText="Регистрация" />
              <Login isSend={isSend} onSubmit={handleLogin} />
            </>
          }
        />
        <Route
          path="sign-up"
          element={
            <>
              <Header name="signup" linkText="Вход" />
              <Register isSend={isSend} onSubmit={handleRegister} />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        onClose={handleClosePopup}
        isOpen={isEditProfilePopupOpen}
        isSend={isSend}
      />
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        onClose={handleClosePopup}
        isOpen={isEditAvatarPopupOpen}
        isSend={isSend}
      />
      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        onClose={handleClosePopup}
        isOpen={isAddPlacePopupOpen}
        isSend={isSend}
      />
      <DeletePopup
        onDeletePlace={handleCardDelete}
        onClose={handleClosePopup}
        isOpen={isDeletePopupOpen}
        isSend={isSend}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={handleClosePopup}
      />
      <InfoTooltip
        isOpen={isResultPopupOpen}
        successful={successful}
        onClose={handleClosePopup}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
