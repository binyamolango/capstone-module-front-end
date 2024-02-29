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

  );
};

export default LogIn;
