import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  //usamos Ref
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      /* El valor de la entrada que obtuvimos utilizando la ref */
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="update"
      title="Cambiar foto de perfil"
      isOpen={isOpen}
      onClose={onClose}
      button="Crear"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="updatePhoto"
        id="updatePhoto"
        className="form__input"
        placeholder="Enlace a la imagen"
        required
        minLength={2}
        ref={avatarRef}
      />
      <span className="form__input-error updatePhoto-error" />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
