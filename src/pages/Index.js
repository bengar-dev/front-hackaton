import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header'
import { searchProduct } from '../services/formServices'

export default function Index() {

    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        if(!localStorage.getItem('userInfo')) navigate('/')
        else {
            console.log('ok')
        }
    })

    const handleSearch = (e) => {
      e.preventDefault()
      searchProduct(searchValue)
    }

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <Header />
      <form className="mt-6 w-full p-4 flex items-center justify-center">
        <input 
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="w-9/12 p-2"
        type="search" id="search" name="search" />
        <button
        onClick={(e) => handleSearch(e)}
        className="p-2 bg-blue-400 text-white w-3/12">
          Chercher
        </button>
      </form>
    </div>
  )
}
