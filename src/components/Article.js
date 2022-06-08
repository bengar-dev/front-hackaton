import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import NutriA from '../assets/640px-Nutri-score-A.svg.png'
import NutriB from '../assets/640px-Nutri-score-B.svg.png'
import NutriC from '../assets/640px-Nutri-score-C.svg.png'
import NutriD from '../assets/640px-Nutri-score-D.svg.png'
import NutriE from '../assets/640px-Nutri-score-E.svg.png'
import Nutri from '../assets/640px-Nutri-score.png'
import DetailsProduct from '../pages/DetailsProduct'

export default function Article(props) {

  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  
  let img = ""

  if(props.nutri === "a") img = NutriA
  else if(props.nutri === "b") img = NutriB
  else if(props.nutri === "c") img = NutriC
  else if(props.nutri === "d") img = NutriD
  else if(props.nutri === "e") img = NutriE
  else img = Nutri

  const handleDetails = () => {
    console.log('hello')
  }

  return (
    <article className="mt-4 mr-2 transition-all duration-200 w-full md:w-80 md:h-72 md:min-h-full bg-white rounded-lg flex flex-col items-center hover:shadow-lg">
        <div className="w-full flex">
          <div className="p-2 w-1/4 flex justify-center">
            <img src={props.image} className="h-32 object-cover ml-auto mr-auto"/>
          </div>
          <h2 className="w-3/4 p-2 font-medium text-blue-500">{props.name}</h2>
        </div>
        <img src={img} className="p-2 w-24 ml-0 mr-auto"/>
        <p className="text-xs w-full p-1">Disponible chez : <span className="font-medium">{props.stores}</span></p>
        <button
        className="transition-all w-full p-1 bg-blue-800 md:mb-0 md:mt-auto hover:bg-blue-900 font-medium text-white">
          Comparer
        </button>
        <button 
        onClick={(e) => e.preventDefault(navigate(`/product/${props.code}`))}
        className="transition-all w-full rounded-b-lg p-1 bg-blue-400 md:mb-0 md:mt-auto hover:bg-blue-500 font-medium text-white">Fiche détails</button>
    </article>
  )
}
