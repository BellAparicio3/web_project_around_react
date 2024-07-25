function PopupWithForm({name, title, isOpen, onClose, children, button}) {
  return (
    <>
      <div
        className={`popup popup__type_${name} ${isOpen ? 'popup_is-opened' : ''}` }
      >
        <button
          type='button'
          className={`popup__close popup__close-${name}`}
          onClick={onClose}
        />
        <div className='form'>
          <form className='forms' name={name} noValidate=''>
            <h3 className='form__title'>{title}</h3>
            {children}
            <button
              type='submit'
              className='form__button'
              id='form__button_add'
            >
              {button}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default PopupWithForm;
