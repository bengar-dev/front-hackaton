import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import Button from "../components/Button";

import { postRegister, verifUsername } from "../services/formServices";
import AlertMessage from "../components/AlertMessage";

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init();

export default function Register() {

  const navigate = useNavigate();

  const [formContent, setFormContent] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [loaderState, setLoaderState] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  //gestion des changements sur nos inputs
  const updateFormData = (e) => {
    if (e.target.id === "username") {
      setFormContent({
        ...formContent,
        username: e.target.value,
      });
    }
    else if (e.target.id === "password")
      setFormContent({
        ...formContent,
        password: e.target.value,
      });
    else if (e.target.id === "email")
      setFormContent({
        ...formContent,
        email: e.target.value,
      });
  }

  function backendResponseHandler(response) {
    setTimeout(() => {
        setLoaderState(false)
        if(typeof response !== "string") {
          setError("valid")
          setMessage("Votre compte a bien été créé")
          setTimeout(() => {
            navigate('/Login')
          }, 1500)
        }
        else if(response === 0) {
          setError("error")
          setMessage("Username déjà existant")
        }
        else {
          setError("error")
          setMessage("Email déjà existant")
          setTimeout(() => {
            setMessage("")
          }, 1500)
        }
        //setErrorState
    }, 1000)
  }

  // gestion des buttons
  const handleClick = (e) => {
    e.preventDefault();
    const props = JSON.parse(e.target.value);
    if (props.type === "submit") {
      setLoaderState(true)
      postRegister(formContent, backendResponseHandler)
    }
    else if (props.type === "classic") navigate("/login");
  };

  const handleVerifUsername = (e) => {
    verifUsername(formContent.username, backendResponseHandler)
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
       {loaderState && <Loader />}
       {message !== "" && <AlertMessage type={error} text={message}  />}
      <form className="bg-white rounded shadow-lg w-11/12 md:w-2/4 p-4 flex flex-col space-y-2" data-aos="fade" data-aos-duration='500'>
        <input
          onBlur={(e) => handleVerifUsername(e)}
          value={formContent.username}
          onChange={(e) => updateFormData(e)}
          className="p-2 border outline-none"
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />
        <input
          value={formContent.email}
          onChange={(e) => updateFormData(e)}
          className="p-2 border outline-none"
          type="email"
          name="email"
          id="email"
          placeholder="email"
        />
        <input
          value={formContent.password}
          onChange={(e) => updateFormData(e)}
          className="p-2 border outline-none"
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <Button type="submit" text="S'enregistrer" func={handleClick} />
        <Button
          type="classic"
          text="Déjà enregistrer ? S'identifier"
          func={handleClick}
        />
      </form>
    </div>
  );
}
