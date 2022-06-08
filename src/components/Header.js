import React, { useEffect, useState } from 'react'
import TitleApp from './TitleApp'

import { useDispatch, useSelector } from 'react-redux'
import DropMenu from './DropMenu'

export default function Header() {

  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(true)
  const {userInfo} = useSelector(state => ({
    ...state.userReducer
  }))

  useEffect(() => {
    if(userInfo.id === "") {
      const getStorage = JSON.parse(localStorage.getItem('userInfo'))
      const newObject = {
        id: getStorage.id,
        email: getStorage.email,
        username: getStorage.username
      }
      console.log(newObject)
      dispatch({
        type: "GETUSERINFO",
        payload: newObject
      })
    }
  })

  return (
    <header className="relative h-16 p-2 bg-zinc-800 flex items-center justify-between">
        <TitleApp />
        <p className="text-white">Bonjour, <button 
        onClick={(e) => e.preventDefault(setToggle(!toggle))}
        className="font-medium">{userInfo.username}</button></p>
        {toggle && <DropMenu />}    
    </header>
  )
}
