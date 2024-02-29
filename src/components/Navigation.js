import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import logo from '../images/logo.png';
import fb from '../images/fb.svg';
import google from '../images/google.svg';
import x from '../images/x.svg';
import github from '../images/github.svg';
import linkedin from '../images/linkedin.svg';

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setName(user);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="nav__section">
      <button
        type="button"
        className="md:hidden absolute top-4 left-4 mr-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-200"
        onClick={toggleMenu}
      >
        {showMenu ? <CloseIcon /> : <MenuIcon />}
      </button>

    </div>
  );
};

export default Navigation;
