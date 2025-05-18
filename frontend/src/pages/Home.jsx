import{useDispatch} from 'react-redux'
import { getProducts } from '../redux/productSlice';
import { useEffect } from 'react' 
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts());
  },[dispatch]);  //dispatching the action to get the products

  const {products, loading} = useSelector((state) => state.product);    //get products state products[] loading error and destructuring it

  console.log(products, loading, 'urunleerr');
  return (
    <>
    {
      loading ? <h1>Loading...</h1> : products?.products &&             //data comes as an array of objects named products and Prototype we seperate it
      <div className=''>
        {
          products?.products?.map((product,i) =>  {                     // ? is used to check if the data is not null or undefined
           return <ProductCard product={products} key={i}/>
          }
            
          )
        }
      </div>
      
    }
    
    </>
  )
}

export default Home