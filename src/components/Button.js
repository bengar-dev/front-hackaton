import React from 'react'

export default function Button(props) {

    let classBtn = ""

    if(props.type === "submit") classBtn = "bg-emerald-300 hover:bg-emerald-400"
    else if(props.type === "classic") classBtn = "bg-zinc-100 hover:bg-zinc-200"
    else if(props.type === "delete") classBtn ="bg-red-300 hover:bg-red-500"
    else if(props.type === "edit") classBtn = "bg-orange-300 hover:bg-orange-500"

  return (
    <button 
    onClick={(e) => props.func(e)}
    value={JSON.stringify(props)}
    className={`transition-all p-2 font-medium text-sm ${classBtn}`}>
        {props.text}
    </button>
  )
}
