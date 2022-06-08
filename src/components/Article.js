import React from 'react'

import NutriA from '../assets/640px-Nutri-score-A.svg.png'
import NutriB from '../assets/640px-Nutri-score-B.svg.png'
import NutriC from '../assets/640px-Nutri-score-C.svg.png'
import NutriD from '../assets/640px-Nutri-score-D.svg.png'
import NutriE from '../assets/640px-Nutri-score-E.svg.png'

export default function Article(props) {
  
  let img = ""

  if(props.nutri === "a") img = NutriA
  else if(props.nutri === "b") img = NutriB
  else if(props.nutri === "c") img = NutriC
  else if(props.nutri === "d") img = NutriD
  else if(props.nutri === "e") img = NutriE

  return (
    <article className="transition-all duration-200 mt-10 w-full bg-white rounded-lg flex flex-col items-center hover:shadow-lg">
        <div className="w-full flex">
          <div className="p-2 w-1/4 flex justify-center">
            <img src={props.image} className="h-32 object-cover ml-auto mr-auto"/>
          </div>
          <h2 className="w-3/4 p-2 font-medium text-blue-500">{props.name}</h2>
        </div>
        <img src={img} className="p-2 w-24 ml-0 mr-auto"/>
        <p className="text-xs w-full p-1">Disponible chez : <span className="font-medium">{props.stores}</span></p>
        <button className="transition-all w-full rounded-b-lg p-1 bg-blue-400 hover:bg-blue-500 font-medium text-white">Fiche détails</button>
    </article>
  )
}
