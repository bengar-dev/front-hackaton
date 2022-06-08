import React from 'react'
import { logoutApp } from '../services/basicServices'
import { useNavigate } from 'react-router-dom'

export default function DropMenu() {

    const navigate = useNavigate()

    const handleLogout = () => {    
        if(logoutApp()) {
            setTimeout(() => {
              navigate('/')
              window.location.reload(false)
            }, 500)
        }
    }
    
  return (
    <ul className="absolute top-16 right-0 bg-white shadow-lg p-4 text-sm">
        <li><button 
        onClick={(e) => e.preventDefault(handleLogout())}
        className="font-medium hover:text-rose-400">Logout</button></li>
    </ul>
  )
}
