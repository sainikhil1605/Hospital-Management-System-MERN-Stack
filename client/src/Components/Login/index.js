import { Button, TextField } from '@material-ui/core';
import jwt from 'jwt-decode';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
function LogIn() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async () => {
    if (!email || !password) {
      setLoginError('Please enter email and password');
      return;
    }
    try {
      const res = await axiosInstance.post('/login', {
        role: location.state,
        email,
        password,
      });
      const token = res.data.token;
      const { name, role } = jwt(token);

      dispatch({ type: 'LOG_IN', payload: { token, name, role } });
      history.push(`/${role}/addDepartment`);
    } catch (err) {
      console.log(err.error);
      setLoginError(err.error);
    }
  };
  return (
    <>
      <p>{loginError}</p>
      <TextField
        type="text"
        autoFocus
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        autoFocus
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={() => handleSubmit()}>
        Log In
      </Button>
    </>
  );
}
export default LogIn;
