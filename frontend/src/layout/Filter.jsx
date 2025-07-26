import React from 'react'

function Filter({setPrice, setRating, setCategory}) {
const categoryList = [
    "pc","laptop","phone","tablet","headphone","watch"
]
const ratingList = [1,2,3,4,5]

  return (
    <div className='w-1/3 mt-12 ml-2 '>
        <div>Filter</div>
        <div className='flex items-center gap-2 my-2'>
            <input onChange={e=>setPrice(prev=> ({ ...prev, min: e.target.value}))} className='border w-16 p-1 outline-none' type="number"  placeholder='min'/>
            <input onChange={e=>setPrice(prev=> ({...prev, max:  e.target.value}))} className='border w-16 p-1 outline-none' type="number"  placeholder='max'/>
        </div>
        <div className='my-2 font-bold ml-2'>Category</div>
        {
        categoryList.map((category, index) => (
           <div  onClick={()=>setCategory(category)}className='text-sn cursor-pointer ml-2' key={index}>{category}</div>
           
        ))
        }
        <hr />
        <div className='my-2 font-bold ml-2'>Raiting</div>
        {
            ratingList.map((rating,index)=>(
            <div onClick={()=>setRating(rating)} className='text-sn cursor-pointer ml-2' key={index}>{rating}</div>    


        ))
        }


    </div>
  )
}

export default Filter