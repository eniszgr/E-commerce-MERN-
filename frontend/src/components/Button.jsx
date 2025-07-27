import React from 'react'

function Button({name,onClick}) {
  return (
    
    <button className='w-full h-10 flex items-center justify-center text-lg bg-slate-600 text-white rounded-md mt-1' onClick={onClick} >{name}</button>
  )
}

export default Button