import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../redux/users/usersSlice';
import img from '../images/bg.jpg';

const LogIn = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(createUser({ name }));
    localStorage.setItem('user', JSON.stringify(name));
    setLoading(false);
    navigate('/item');
  };

  const handleUsernameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
        <div className="flex items-center justify-center flex-col gap-6 w-4/5 p-12 md:max-w-fit md:max-h-fit bg-white rounded-md">
          <h1 className="font-bold text-3xl text-center">
            Welcome to
            <span className="text-[#4e8de0] "> Edenic Health</span>
          </h1>

        </div>
      </div>
    </>
  );
};

export default LogIn;
