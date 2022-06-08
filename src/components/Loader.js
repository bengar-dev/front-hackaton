import React from 'react'

import '../style/loader.css'

export default function Loader() {
  return (
    <div className="absolute z-30 top-0 w-full flex items-center justify-center min-h-screen">
      <div className="absolute top-0 z-20 bg-zinc-300 opacity-50 w-full min-h-screen"></div>
      <div className="absolute z-30 loader" ></div>
    </div>
  )
}
