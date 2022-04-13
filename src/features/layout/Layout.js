import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../UI/Navbar';

export default function Layout() {
  return (
    <div>
      {<Navigation />}

      <Outlet />
    </div>
  );
}
