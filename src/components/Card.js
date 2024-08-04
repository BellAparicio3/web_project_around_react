import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  // Verifica si el usuario actual es el propietario de la tarjeta actual
  const isOwn = card.owner._id === currentUser._id;
  // Creando una variable que después establecerás en `className` para el botón eliminar
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;
  // Verifica si el usuario actual dio "like" a la tarjeta
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Crea una variable que después establecerás en `className` para el botón like
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        className="card__img"
        src={card.link}
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <img
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
          src={require("../images/trash.png")}
          alt="Bote de basura"
        />
        <p className="card__name">{card.name}</p>
        <img
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          src={require("../images/heart.png")}
          alt="Icono Me gusta"
        />
        <span className="card__like_count">{card.likes.length}</span>
      </div>
    </div>
  );
}
export default Card;
