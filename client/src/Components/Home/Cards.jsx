import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { HomeCard } from './Home.styles';
function Card({ role, src, link }) {
  const history = useHistory();
  return (
    <HomeCard>
      <img width="100%" height="500px" src={src} alt="Admin" />
      <h1>{role.toUpperCase()}</h1>
      <p>Click Below to Login</p>
      <Button onClick={() => history.push('/login', role)}>Log In</Button>
    </HomeCard>
  );
}

export default Card;
