import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/signup" element={ <SignUp /> } />
      <Route path="/contacts" element={ <Contacts /> } />
    </Routes>
  );
};
