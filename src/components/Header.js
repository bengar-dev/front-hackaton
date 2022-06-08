import React, { useEffect } from 'react'
import TitleApp from './TitleApp'

import { useDispatch, useSelector } from 'react-redux'

export default function Header() {

  const dispatch = useDispatch()
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
    <header className="p-4 bg-zinc-800 flex items-center justify-between">
        <TitleApp />
        <p className="text-white">Bonjour, <button className="font-medium">Benoit</button></p>
    </header>
  )
}
