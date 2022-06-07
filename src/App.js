import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Hello from "./components/Hello";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import CustomText from "./pages/CustomText";
import Index from "./pages/Index";
import ErrorPage from "./pages/404";

function App() {
  //verification si notre utilisateur est auth
  const isAuth = localStorage.getItem("userInfo");
  return (
    <>
      <h1 className="absolute z-40 p-2 w-full text-center font-medium text-xl">
        Hackathon 2022
      </h1>
      {isAuth == null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/custom_text/:text" element={<CustomText />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
