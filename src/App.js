import React from 'react';
// Bootstrap
import './custom.scss';
// Components
import Layout from './features/layout/Layout';
import Home from './features/home/Home';
import Purchase from './features/purchase/Purchase';
import Product from './features/product/Product';
import NoMatch from './features/no-match/NoMatch';
// Router
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './features/auth/ProtectedRoutes';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/purchase' element={<Purchase />} />
        </Route>
        <Route path='shop/:id' element={<Product />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
