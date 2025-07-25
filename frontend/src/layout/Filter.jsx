import React from 'react'

function Filter() {
const categoryList = [
    "pc","laptop","phone","tablet","headphone","watch"
]
const raitingList = [1,2,3,4,5]

  return (
    <div className='w-1/3 mt-12 ml-2 '>
        <div>Filter</div>
        <div className='flex items-center gap-2 my-2'>
            <input className='border w-16 p-1 outline-none' type="number"  placeholder='min'/>
            <input className='border w-16 p-1 outline-none' type="number"  placeholder='max'/>
        </div>
        <div className='my-2 font-bold ml-2'>Category</div>
        {
        categoryList.map((category, index) => (
           <div className='text-sn cursor-pointer ml-2' key={index}>{category}</div>
           
        ))
        }
        <hr />
        <div className='my-2 font-bold ml-2'>Raiting</div>
        {
            raitingList.map((raiting,index)=>(
            <div className='text-sn cursor-pointer ml-2' key={index}>{raiting}</div>    


        ))
        }


    </div>
  )
}

export default Filter