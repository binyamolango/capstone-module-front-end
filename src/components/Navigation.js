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
      <div className={`${showMenu ? 'flex absolute top-0 left-0 z-50' : 'hidden md:flex'} flex-col pt-4 pb-12 md:pb-1 justify-between items-center h-[100dvh] bg-white  w-full drop-shadow-md`}>
        <div>
          <img className="logo-img" src={logo} alt="" />
          <button
            type="button"
            className="md:hidden absolute top-4 left-4 mr-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-200"
            onClick={toggleMenu}
          >
            {showMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div className="-m-20 text-center w-full uppercase">
          <h1 className="font-medium w-full p-2">
            Hello
            {' '}
            <span className="text-[#4e8de0]">
              {name}
              {' '}
            </span>
            <WavingHandIcon />
          </h1>
          <p className="font-medium text-sm w-full">
            Welcome to
            <span className="text-[#4e8de0]"> our system</span>
          </p>
        </div>

        <nav className="w-full">
          <ul className="flex flex-col">
            <NavLink to="/item" className="active-link" onClick={closeMenu}>
              <li className="flex p-4 w-full text-sm font-medium cursor-pointer border-b border-gray-200">Doctors</li>
            </NavLink>

            <NavLink to="/bookappointment" className="active-link" onClick={closeMenu}>
              <li className="flex p-4 w-full text-sm font-medium cursor-pointer border-b border-gray-200">
                Book Appointment
              </li>
            </NavLink>

            <NavLink to="/myappointments" className="active-link" onClick={closeMenu}>
              <li className="flex p-4 w-full text-sm font-medium cursor-pointer border-b border-gray-200">My Appointments</li>
            </NavLink>

            <NavLink to="/adddoctor" className="active-link" onClick={closeMenu}>
              <li className="flex p-4 w-full text-sm font-medium cursor-pointer border-b border-gray-200">Add Doctor</li>
            </NavLink>

            <NavLink to="/deletedoctor" className="active-link" onClick={closeMenu}>
              <li className="flex p-4 w-full text-sm font-medium cursor-pointer border-b border-gray-200">Delete Doctor</li>
            </NavLink>
          </ul>

          <div className="text-center m-3 pt-2">
            <button type="button" onClick={handleLogout} className="pl-6 pr-6 pt-1 pb-1 self-end text-white bg-blue-400 rounded-r-[100px] rounded-l-[100px]">
              Logout
            </button>
          </div>
        </nav>


      </div>
    </div>
  );
};

export default Navigation;
