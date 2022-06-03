import React from 'react'
import { Link } from 'react-router-dom'

export default function Hello() {
  
  return (
    <div className="pt-10 font-medium flex flex-col items-center space-y-1 text-rose-500">
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </div>
  )
  
}
