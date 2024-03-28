import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./pages/Layout";
import Login from './pages/Login';
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Layout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
