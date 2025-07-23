import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../redux/productSlice';

function Detail() {
  const {id} = useParams(); 
  const dispatch = useDispatch();
  const {product,loading} = useSelector((state)=> state.product); 
  
  useEffect(() => { 
    if(id){
      dispatch(getProductDetails(id));
    }
    
  }, [dispatch, id]); 
  console.log(loading,product);

  return (
    <div>
      <div className='flex'>
        {
          product?.product && <div>

          </div>
        }
      </div>
    </div>
  )
}

export default Detail