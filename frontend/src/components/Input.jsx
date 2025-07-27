import React from 'react'

function Input({placeholder, value, name, id,type}) {
  return (
    <input    className='border w-full h-10 p-2 outline-none rounded-md my-2' id={id} type={type} placeholder={placeholder} value={value} name={name}/>




  )
}

export default Input