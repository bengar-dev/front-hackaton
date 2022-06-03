import React from 'react'
import { useParams } from 'react-router-dom'

export default function CustomText() {
    const params = useParams()

  return (
    <div>{params.text}</div>
  )
}
