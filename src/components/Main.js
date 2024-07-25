import { useState, useEffect } from "react";
import avatar from "../images/avatar.png"
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  closeAllPopups,
  selectedCard
}) {
  // Variables de estado
  // La primera inicializa, la segunda actualiza
  const [userName, setUserName] = useState("Berenice");
  const [userDescription, setUserDescription] = useState("Software Developer");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  // Permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    api.loadUserInfo().then((response) => {
      setUserName(response.name);
      setUserDescription(response.about);
      setUserAvatar(response.avatar);
    });
    api.getInitialCards().then((response) => {
      setCards(response)
    });

  },[]);

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__avatar">
            <img
              className="profile__avatar-edition"
              src={require("../images/edition.png")}
              alt="Edicion"
              onClick={onEditAvatarClick}
            />
            <img
              className="profile__avatar-imagen"
              alt="avatar user"
              style={{ backgroundImage: `url(${userAvatar})` }}
            />
          </div>
          <div className="profile__info">
            {/* BOTON EDITAR */}
            <button
              className="profile__button-edit"
              onClick={onEditProfileClick}
            />
            <h3 className="profile__info-name" id="profile__name">
              {userName}
            </h3>
            <p className="profile__info-about" id="profile__aboutme">
              {userDescription}
            </p>
          </div>
          {/* BUTTON AGREGAR */}
          <button className="profile__button-add" onClick={onAddPlaceClick} />
        </section>
        <section className="cards">
          {cards.map((card)=>(
            <Card card={card} onCardClick={onCardClick} />
          ))}
        </section>
        
        {/* POPS */}
        <PopupWithForm
          name="edit"
          title="Editar Perfil"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          button="Guardar"
        >
          <input
            type="text"
            id="nameUser"
            className="form__input"
            name="name"
            placeholder="Nombre"
            required=""
            minLength={2}
            maxLength={40}
          />
          <span className="form__input-error nameUser-error" />
          <input
            type="text"
            id="aboutMe"
            className="form__input"
            name="about"
            placeholder="Acerca de mi"
            required=""
            minLength={2}
            maxLength={200}
          />
          <span className="form__input-error aboutMe-error" />
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Nuevo Lugar"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          button="Guardar"
        >
          <input
            type="text"
            name="title"
            id="title"
            className="form__input"
            placeholder="Título"
            required=""
            minLength={2}
            maxLength={30}
          />
          <span className="form__input-error title-error" />
          <input
            type="text"
            name="image_url"
            id="imageUrl"
            className="form__input"
            placeholder="Enlace a la imagen"
            required=""
            minLength={2}
          />
          <span className="form__input-error imageUrl-error" />
        </PopupWithForm>
        <PopupWithForm
          name="update"
          title="Cambiar foto de perfil"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          button="Crear"
        >
          <input
            type="text"
            name="updatePhoto"
            id="updatePhoto"
            className="form__input"
            placeholder="Enlace a la imagen"
            required=""
            minLength={2}
          />
          <span className="form__input-error updatePhoto-error" />
        </PopupWithForm>
        <PopupWithForm
          name="confirm"
          title="¿Estás Seguro?"
          button="Si"
          id="confirm"
        ></PopupWithForm>
        <ImagePopup isOpen={!!selectedCard} name="images" card={selectedCard} onClose={closeAllPopups} />
      </main>
    </>
  );
}
export default Main;
