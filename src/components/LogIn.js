import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import img from '../images/bg.jpg';
import { createSession } from '../redux/sessions/sessionsSlice';

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const session = useSelector((state) => state.sessions.createSessionMsg);
  const loggedIn = session.logged_in;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(createSession({ email, password }));
    setLoading(false);
    if (loggedIn) {
      navigate('/');
    }
  };

  const handleUserEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="flex flex-col gap-24 items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
        <h1 className="font-bold text-5xl text-center">
          Welcome to
          <span className="text-[#4e8de0]"> Edenic Health</span>
        </h1>
        <div className="flex items-center justify-center flex-col gap-6 w-4/5 p-16 md:max-w-fit md:max-h-fit bg-white rounded-md">
          <h1 className="font-bold text-4xl text-center">
            Log
            {' '}
            <span className="text-[#4e8de0]">in</span>
          </h1>
          <form className="flex items-center justify-center flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              required
              id="outlined-basic"
              type="email"
              onChange={(e) => handleUserEmailChange(e)}
              label="Email"
              variant="outlined"
            />
            <TextField
              required
              id="outlined-basic2"
              type="password"
              onChange={(e) => handleUserPasswordChange(e)}
              label="Password"
              variant="outlined"
            />
            <div className="flex gap-4">
              <Button type="submit" variant="outlined" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Log in'}
              </Button>
              <Button type="submit" variant="outlined" disabled={loading} onClick={handleSignUp}>
                {loading ? <CircularProgress size={24} /> : 'Sign up'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
