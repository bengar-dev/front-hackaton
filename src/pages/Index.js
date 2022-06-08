import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header'

export default function Index() {

    const navigate = useNavigate()
    

    useEffect(() => {
        if(!localStorage.getItem('userInfo')) navigate('/')
        else {
            console.log('ok')
        }
    })

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <Header />
      <form className="w-full p-4 flex items-center justify-center">
        <input 
        className="w-9/12 p-2"
        type="search" id="search" name="search" />
        <button
        className="p-2 bg-blue-400 text-white w-3/12">
          Chercher
        </button>
      </form>
    </div>
  )
}
