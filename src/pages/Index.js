import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {

    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('userInfo')) navigate('/')
        else {
            console.log('ok')
        }
    })

  return (
    <div>Index</div>
  )
}
