import React from 'react'

function Input({placeholder, value, name, id, type, onChange}) {
  return (
    <input
      className='border w-full h-10 p-2 outline-none rounded-md my-2'
      id={id}
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      {...(type !== 'file' ? { value } : {})}
    />
  )
}

export default Input