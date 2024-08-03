import { useContext } from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onCardClick,
  closeAllPopups,
  selectedCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  //objeto del componente CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  return (
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
            src={currentUser?.avatar}
          />
        </div>
        <div className="profile__info">
          {/* BOTON EDITAR */}
          <button
            className="profile__button-edit"
            onClick={onEditProfileClick}
          />
          <h3 className="profile__info-name" id="profile__name">
            {currentUser?.name}
          </h3>
          <p className="profile__info-about" id="profile__aboutme">
            {currentUser?.about}
          </p>
        </div>
        {/* BUTTON AGREGAR */}
        <button className="profile__button-add" onClick={onAddPlaceClick} />
      </section>
      {/* Cards */}
      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
      <PopupWithForm
        name="confirm"
        title="¿Estás Seguro?"
        button="Si"
        id="confirm"
      ></PopupWithForm>
      <ImagePopup
        isOpen={!!selectedCard}
        name="images"
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </main>
  );
}
export default Main;
