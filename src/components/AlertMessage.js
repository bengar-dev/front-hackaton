import React from 'react'

export default function AlertMessage(props) {

    
  return (
    <p className="flex items-center justify-center h-10 text-sm font-medium">
        {props.text}
    </p>
  )
}
