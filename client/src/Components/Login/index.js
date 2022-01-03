import { Button, Paper, TextField } from '@material-ui/core';
import jwt from 'jwt-decode';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../../utils/axiosInstance';
import LoginCard from './LoginCard';
import LoginNav from './LoginNav';
const LoginPaper = styled(Paper)`
  width: 700px;
  height: 500px;
  display: flex;
  padding: 80px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
`;
const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
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
      if (role === 'admin') {
        history.push(`/${role}/addDepartment`);
      } else if (role === 'doctor') {
        history.push(`/${role}/appointments`);
      } else {
        history.push(`/${role}/doctors`);
      }
    } catch (err) {
      console.log(err.error);
      setLoginError(err.error);
    }
  };
  return (
    <>
      <LoginNav />
      <Container>
        <LoginCard role={location.state} />
        <LoginContainer>
          <LoginPaper>
            <h1>Login</h1>
            <p>{loginError}</p>

            <TextField
              type="text"
              fullWidth
              autoFocus
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              color="primary"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Log In
            </Button>
          </LoginPaper>
        </LoginContainer>
      </Container>
    </>
  );
}
export default LogIn;
