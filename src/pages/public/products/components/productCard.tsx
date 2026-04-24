import type { Product } from '@/core/modals/product'
import { Button } from '@/components/ui/button';
// import { ShoppingCart } from 'lucide-react';
import ReviewStars from './ReviewStars';
import {  useNavigate } from 'react-router';
// import WishlistToggleButton from '@/components/wishlist/WishlistToggleButton';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/stores/slice/cartSlice';

interface ProductCardProps {
  product: Product;
  children?: React.ReactElement
}

function ProductCard({ product, children }: ProductCardProps) {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-200 ease-out hover:translate-y-1 hover:shadow-xl" key={product.id}>

    <img className='w-full h-75 object-cover rounded-t-xl' 
    src={product.image} 
    alt={product.name} 
    onClick={()=>navigate(`/product/${product.id}`)}
     /> 
 {/* <!-- TOGGLE WISHLIST BUTTON --> */}
  {children}

    <div className="p-5 flex flex-col flex-1">
    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
      { product.name }
    </h3>
    <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
      { product.description }
    </p>

     {/* <!--  ADD RATING COMPONENT --> */}
    {/* <ReviewStars rating={product.rating} /> */}
    <ReviewStars rating={product.rating || 0} >
      {product.rating} ({product.reviewCount} reviews)
    </ReviewStars>

    <div className="text-sm font-medium mb-4">
      {
        product.inStock ?
        <span className="text-green-600 font-bold">In Stock</span> 
        : <span className="text-red-800 font-bold"> Out of Stock</span>
      }
    </div>

    <div className="flex items-center justify-between mt-auto">
      <span className="text-2xl font-bold text-gray-900"> ${product.price.toFixed(2) } </span>
        <Button disabled={!product.inStock}  onClick={()=>{  dispatch(addToCart({ product, quantity: 1 })) }}>
          <FontAwesomeIcon icon={faCartArrowDown} />{product.inStock ? 'Add to Cart' : 'Out of Stock '}
        </Button> 
     
    </div>
  </div>
</div>
  );
}

export default ProductCard;