import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TitleApp from './TitleApp'
import DropMenu from './DropMenu'

export default function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)
  const {userInfo} = useSelector(state => ({
    ...state.userReducer
  }))

  useEffect(() => {
    if(!localStorage.getItem('userInfo')) navigate('/')
    else {
      if(userInfo.id === "") {
        const getStorage = JSON.parse(localStorage.getItem('userInfo'))
        const newObject = {
          id: getStorage.id,
          email: getStorage.email,
          username: getStorage.username
        }
        dispatch({
          type: "GETUSERINFO",
          payload: newObject
        })
      }   
    }
  })

  return (
    <header className="relative h-16 w-full p-2 bg-zinc-800 flex items-center justify-between">
        <TitleApp />
        <p className="text-white">Bonjour, <button 
        onClick={(e) => e.preventDefault(setToggle(!toggle))}
        className="font-medium">{userInfo.username}</button></p>
        {toggle && <DropMenu />}    
    </header>
  )
}
