import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import CustomText from "./pages/CustomText";
import Index from "./pages/Index";
import ErrorPage from "./pages/404";
import DetailsProduct from "./pages/DetailsProduct";

function App() {
  //verification si notre utilisateur est auth
  const isAuth = localStorage.getItem("userInfo");
  return (
    <>
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
          <Route path="/product/:code" element={<DetailsProduct />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
