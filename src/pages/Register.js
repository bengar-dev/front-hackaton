import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import Button from "../components/Button";

import { useSelector, useDispatch } from "react-redux";
import { errorTranslator, hideAlert } from "../services/basicServices";
import { postRegister, verifUsername } from "../services/formServices";
import AlertMessage from "../components/AlertMessage";

import AOS from "aos";
import "aos/dist/aos.css";
import TitleApp from "../components/TitleApp";
AOS.init();

export default function Register() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formContent, setFormContent] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loaderState, setLoaderState] = useState(false);
  const {alertMsg} = useSelector(state => ({
    ...state.formReducer
  }))

  //gestion des changements sur nos inputs
  const updateFormData = (e) => {
    if (e.target.id === "username") {
      setFormContent({
        ...formContent,
        username: e.target.value,
      });
    } else if (e.target.id === "password")
      setFormContent({
        ...formContent,
        password: e.target.value,
      });
    else if (e.target.id === "email")
      setFormContent({
        ...formContent,
        email: e.target.value,
      });
  };

  //fonction de gestion des erreurs
  const backendResponseHandler = (response) => {
    setTimeout(() => {
      setLoaderState(false);
      const msgError = errorTranslator(response.type, response.input)
      dispatch({
        type: "ALERTMSG",
        payload: msgError
      })
      if(msgError.type === "register") {
        setTimeout(() => {
          navigate('/')
          dispatch({
            type: "ALERTMSG",
            payload: {
              ...msgError,
              msg: ""
            }
          })
        }, 1500)
      } else {
        setTimeout(() => {
          dispatch({
            type: "ALERTMSG",
            payload: {
              ...msgError,
              msg: ""
            }
          })
        }, 2000)
      }
    }, 1000);
  }

  // gestion des buttons
  const handleClick = (e) => {
    e.preventDefault();
    const props = JSON.parse(e.target.value);
    if (props.type === "submit") {
      setLoaderState(true);
      postRegister(formContent, backendResponseHandler);
    } else if (props.type === "classic") navigate("/");
  };

  // verification à la sortie du champ de l'username/email
  const handleVerifUsername = (e) => {
    verifUsername(e.target.value, backendResponseHandler);
  };
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col space-y-4 items-center justify-center">
      <TitleApp />
      {loaderState && <Loader />}
      {alertMsg.msg !== "" && <AlertMessage type={alertMsg.statut} text={alertMsg.msg} />}
      <form
        className="bg-white rounded shadow-lg w-11/12 md:w-2/4 p-4 flex flex-col space-y-2"
        data-aos="fade"
        data-aos-duration="500"
      >
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
          onBlur={(e) => handleVerifUsername(e)}
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
