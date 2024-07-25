import logo from '../images/logo.png';

function Header() {
  return (
    <>
      <header className='header'>
        <img
          src={logo}
          alt='Logo Around The U.S. '
          className='header__logo'
        />
        <hr className='header__division' />
      </header>
    </>
  );
}

export default Header;
