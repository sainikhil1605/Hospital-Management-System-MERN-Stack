import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

function LogIn() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    const res = await axiosInstance.post('/login', {
      role: location.state,
      email,
      password,
    });
    console.log(res);
  };
  return (
    <>
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
