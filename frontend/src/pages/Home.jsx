import{useDispatch} from 'react-redux'
import { getProducts } from '../redux/productSlice';
import { useEffect } from 'react' 
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts({keyword:''}));
  },[dispatch]);  //dispatching the action to get the products

  const {products, loading} = useSelector((state) => state.product);    //Destructure the products array and loading state from the product slice in the Redux store


 return (
  <>
    <div className="w-full h-[400px] overflow-hidden">
      <img className="w-full h-full  object-cover object-bottom" src="https://plturkey.org/wp-content/uploads/2019/05/discount.jpg" alt="" />
    </div>
    {
      loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {products?.products?.map((product, i) => (
            <ProductCard product={product} key={product.id || i} />
          ))}
        </div>
      )
    }
  </>
);

}

export default Home