import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import Loader from '../components/Loader'
import Button from '../components/Button'
import AlertMessage from '../components/AlertMessage'


import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init();


export default function ForgotPassword() {
  const [loaderState, setLoaderState] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    const props = JSON.parse(e.target.value);
    if(props.type === "submit") console.log('mot de passe envoyé')
    else if(props.type === "classic") navigate('/login')
  }
  
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
      {loaderState && <Loader />}
        <form className="bg-white rounded shadow-lg w-11/12 md:w-2/4 p-4 flex flex-col space-y-2" id="loginForm" data-aos="fade" data-aos-duration='500'>
            <input 
            className="p-2 border outline-none"
            type="text" name="login" id="login" placeholder="Adresse e-mail"
            />

            {message !== "" && <AlertMessage text={message} />}

            <Button
            type="submit"
            text="Envoyer"
            func={handleClick} />
            <Button
            type="classic"
            text="Retour"
            func={handleClick} />
        </form>
    </div>
  )
}
