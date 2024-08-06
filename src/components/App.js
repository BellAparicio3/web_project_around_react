import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  // Variables de estado de los popups. La primera inicializa, la segunda actualiza
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        console.error("Error al obtener la información del usuario:", error);
      });
  }, []);
  // handlers controladores de eventos
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
    .then((newUserInfo) =>{
      setCurrentUser(newUserInfo);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }
  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar.avatar).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(newPlace) {
    api.addCard(newPlace).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          closeAllPopups={closeAllPopups}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          selectedCard={selectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        ></Main>
        <Footer />
        {/* Pops -> editar perfil, editar avatar y agregar lugar */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          button="Guardar"
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          button="Guardar"
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          button="Enviar"
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
