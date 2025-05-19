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
  console.log('------------------')
  products?.products?.forEach((product, index) => {
  console.log(`Product ${index} images:`, product.images);
});
 return (
  <>
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