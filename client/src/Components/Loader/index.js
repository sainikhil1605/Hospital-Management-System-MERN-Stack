import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const LoaderOuterContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Loader() {
  return (
    <LoaderOuterContainer>
      <CircularProgress />
    </LoaderOuterContainer>
  );
}
export default Loader;
