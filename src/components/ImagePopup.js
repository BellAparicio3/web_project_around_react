function ImagePopup({ name, card, isOpen, onClose }) {
  // En React vr. 17 no es necesario agregar 'props'
  return (
    <div
      className={`popup popup__type_${name} ${isOpen ? "popup_is-opened" : ""}`}
    >
      <button
        type="button"
        className={`popup__close popup__close-${name}`}
        onClick={onClose}
      />
      <img src={card?.link} alt={card?.name} className="popup__imagen" />
      <p className="popup__name">{card?.name}</p>
    </div>
  );
}

export default ImagePopup;
