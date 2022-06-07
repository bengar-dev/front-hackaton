import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { postLogin } from "../services/formServices";

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init();

export default function Login() {
  const navigate = useNavigate();

  const [formContent, setFormContent] = useState({ login: "", password: "" });
  const [loaderState, setLoaderState] = useState(false);
  const [message, setMessage] = useState("");

  function updateFormData(e) {
    const newFormContent = formContent;

    if (e.target.id === "login")
      setFormContent({
        ...newFormContent,
        login: e.target.value,
      });
    else if (e.target.id === "password")
      setFormContent({
        ...newFormContent,
        password: e.target.value,
      });
  }

  function backendResponseHandler(response) {
    setTimeout(() => {
      setLoaderState(false);
      if (response.type === "login") {
        console.log('ok auth')
        /*setError("valid");
        setMessage(errorTranslator(404))*/
      } else if (response === "false") {
        console.log('erreur login')
        /*setError("error");
        setMessage("Erreur de communication avec le serveur");
        setTimeout(() => {
          setMessage("");
        }, 1500);*/
      }
    }, 1000);
  }

  const handleClick = (e) => {
    const props = JSON.parse(e.target.value);
    e.preventDefault();
    if (props.type === "classic") {
      navigate("/register");
    } else if (props.type === "classic-alt") {
      navigate("/forgot_password");
    } else if (props.type === "submit") {
      setLoaderState(true);
      postLogin(formContent, backendResponseHandler);
    }
  };

  return (
    <div className="relative top-0 min-h-screen bg-zinc-100 flex items-center justify-center">
      {message !== "" && <AlertMessage type="error" text={message} />}
      {loaderState && <Loader />}
      <form
        className="bg-white rounded shadow-lg w-11/12 md:w-2/4 p-4 flex flex-col space-y-2"
        id="loginForm"
        data-aos="fade" data-aos-duration='500'
      >
        <input
          className="p-2 border outline-none"
          type="text"
          name="login"
          id="login"
          placeholder="Nom d'utilisateur/Adresse e-mail"
          onChange={updateFormData}
          value={formContent.login}
        />
        <input
          className="p-2 border outline-none"
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          onChange={updateFormData}
          value={formContent.password}
        />

        <Button type="submit" text="Authentication" func={handleClick} />
        <Button type="classic" text="Inscription" func={handleClick} />
        <Button type="classic-alt" text="Mot de passe oublié ?" func={handleClick} />
      </form>
    </div>
  );
}
