import React from 'react';
import NavBar from './Navigation2';
import { Outlet } from 'react-router';
import { Container } from '@mui/system';

const WithNav = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" disableGutters={true}>
        <Outlet />
      </Container>
    </>
  );
};

export default WithNav;