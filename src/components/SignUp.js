import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../redux/users/usersSlice';
import img from '../images/bg.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const registration = useSelector((state) => state.users.createUserMsg);
  let registrationError = registration.error;
  let registrationStatus = registration.status;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(createUser({
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }));
    setLoading(false);
    if (registrationStatus === 'created') {
      navigate('/');
      registrationStatus = null;
    } else {
      setError(registrationError);
      registrationError = null;
    }
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleLogIn = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex flex-col gap-24 items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
        <h1 className="font-bold text-5xl text-center">
          Welcome to
          <span className="text-[#4e8de0]"> Edenic Health</span>
        </h1>
        <div className="flex items-center justify-center flex-col gap-6 w-4/5 py-6 pb-14 px-32 md:max-w-fit md:max-h-fit bg-white rounded-md">
          <p>{ error && error }</p>
          <h1 className="font-bold text-4xl pb-4 text-center">
            Sign
            {' '}
            <span className="text-[#4e8de0]">up</span>
          </h1>
          <form className="flex items-center justify-center flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              required
              className="w-60"
              id="outlined-basic"
              type="text"
              onChange={(e) => handleUsernameChange(e)}
              label="Username"
              variant="outlined"
            />
            <TextField
              required
              className="w-60"
              id="outlined-basic2"
              type="email"
              onChange={(e) => handleEmailChange(e)}
              label="Email"
              variant="outlined"
            />
            <TextField
              required
              className="w-60"
              id="outlined-basic3"
              type="password"
              onChange={(e) => handlePasswordChange(e)}
              label="Password"
              variant="outlined"
            />
            <TextField
              required
              className="w-60"
              id="outlined-basic4"
              type="password"
              onChange={(e) => handlePasswordConfirmationChange(e)}
              label="Password Confirmation"
              variant="outlined"
            />
            <div className="flex gap-4">
              <Button type="submit" variant="outlined" disabled={loading} onClick={handleLogIn}>
                {loading ? <CircularProgress size={24} /> : 'Log in'}
              </Button>
              <Button type="submit" variant="outlined" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Sign up'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
