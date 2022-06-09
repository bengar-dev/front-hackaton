import React from 'react'
import { Link } from 'react-router-dom'

import {BsCart4} from 'react-icons/bs'

export default function TitleApp() {
  return (
    <h1 className="flex items-center text-cyan-600 text-2xl font-medium"><Link to="/" className="flex items-center space-x-2"><BsCart4 className="mr-2" /> Bench<span className="font-bold">Marque</span></Link></h1>
  )
}
