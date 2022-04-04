// React
import React from 'react';
// Styling
import './App.scss';
// Components
import Navigation from './UI/Navbar';
// Router
import { Routes, Route, Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index /* path='home' */ element={<Home />} />
        <Route path='purchase' element={<Purchase />} />
        <Route path='shop/:id' element={<Dashboard />} />
        {/* <Route path='*' element={<Home />} /> */}
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      {<Navigation />}

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Purchase() {
  return (
    <div>
      <h2>Purchase</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}
