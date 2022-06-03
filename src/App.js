import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Hello from './components/Hello';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import CustomText from './pages/CustomText';


function App() {
  return (
    <div className="bg-zinc-100">
      <h1 className="absolute z-40 p-2 w-full text-center font-medium text-xl">Hackathon 2022</h1>
      <Routes>
        <Route path='/test' element={<Hello />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
        <Route path='/custom_text/:text' element={<CustomText />} />
      </Routes>
    </div>
  );
}

export default App;
