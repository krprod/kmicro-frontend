import SingleProductInfo from '@/pages/public/products/components/SingleProductInfo';
// import type { Product } from '@/core/modals/product';
import { useAppSelector} from '@/stores/store';
import { useParams } from 'react-router';
import Error404 from '../../Error404';
import BackButton from '@/components/BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import type { Product } from '@/core/modals/product';
import { useApi } from '../../../hooks/useApi';

function SingleProduct() {
        const [currentProduct, setCurrentProduct] = useState<Product>();
    const params = useParams();
    const { callApi } = useApi();
    const products = useAppSelector((state) => state.products.products);
    
    useEffect(() => {
        
        const product  = products.find((p: Product) => p.id === parseInt(params.id || '0', 10));
        async function fetchProductDetails() {
            if (!product && params.id) {
                try {
                    const response = await callApi("GET", `/api/products/${params.id}`);
                    if (response.success) {
                        setCurrentProduct(response.data as Product);
                    } else {
                        console.error("Failed to fetch product details:", response.error);
                    }
                } catch (error) {
                    console.error("Error fetching product details:", error);
                }
            }else{
                setCurrentProduct(product);
            }
        }

        fetchProductDetails();

    }, [ products, callApi, params.id]);

  return (
  currentProduct ?
     <div className="mx-auto max-w-300 py-6">
         <BackButton text="Back To Shopping" path="/products" > 
         <FontAwesomeIcon icon={faArrowLeft} />
         </BackButton>
         <div className="flex gap-8 mb-8 mt-6">
        <img
         src={currentProduct?.image}
          alt={currentProduct?.name}
           className="w-125 h-125 object-cover rounded-lg shadow-md"   />
        <div className="flex-1">  
            <SingleProductInfo product={currentProduct ?? null}/>
        </div>
      </div>
      {/* NEED TO CREATE <app-view-reviews [product]="product" />*/}
  </div>
   : <Error404 message='Product Not Found' />
  )
 
}

export default SingleProduct