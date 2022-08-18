import React from 'react';
import NavBar from './Navigation2';
import { Outlet } from 'react-router';

const WithNav = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default WithNav;