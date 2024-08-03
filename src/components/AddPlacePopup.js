import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  }
  useEffect(()=>{
    setName('');
    setLink('');
  }, []);

  return (
    <PopupWithForm
      name="add"
      title="Nuevo Lugar"
      isOpen={isOpen}
      onClose={onClose}
      button="Guardar"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        id="title"
        className="form__input"
        placeholder="Título"
        required
        minLength={2}
        maxLength={30}
        value={name}
        onChange={handleChangeName}
      />
      <span className="form__input-error title-error" />
      <input
        type="text"
        name="image_url"
        id="imageUrl"
        className="form__input"
        placeholder="Enlace a la imagen"
        required
        minLength={2}
        value={link}
        onChange={handleChangeLink}
      />
      <span className="form__input-error imageUrl-error" />
    </PopupWithForm>
  );
}
export default AddPlacePopup;
