import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //Suscripcion al contexto
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  //Componente controlado
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Edit profile"
      name="edit"
      button="Guardar"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="nameUser"
        className="form__input"
        name="name"
        placeholder="Nombre"
        required
        minLength={2}
        maxLength={40}
        value={name}
        onChange={handleChangeName}
      />
      <span className="form__input-error nameUser-error" />
      <input
        type="text"
        id="aboutMe"
        className="form__input"
        name="about"
        placeholder="Acerca de mi"
        required
        minLength={2}
        maxLength={200}
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="form__input-error aboutMe-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
