import Header from "./Header";
import CustomSidebar from "../customSidebar/CustomSidebar";
import ProductListing from "@/pages/public/products/ProductListing";
import { useAppSelector } from "@/stores/store";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useDispatch } from 'react-redux';
import { setProducts } from "@/stores/slice/productSlice";
import FallbackLoading from "../FallbackLoading";
import type { Product, ProductListingResponse } from "@/core/modals/product";
import { toast, ToastContainer, Zoom } from "react-toastify";


const  ProductListingLayout = () => {

  const [localProducts, setLocalProducts] = useState<Product[]>([]);
   const productSlice = useAppSelector((state) => state.products);
   const dispatch = useDispatch();
   const {callApi, loading} = useApi();
   
    const  getProducts = async() => {
       const response = await callApi<ProductListingResponse>( 'GET', '/api/products/paginated?page=1&size=50' );
       if(!response.success){
                toast.error('Something went wrong');
                console.log(response);
       }
       const products = response?.data?.content as Product[] || [];
        if(products && products.length > 0){
                setLocalProducts(products);
                dispatch(setProducts(products));
        }else{
                toast.error("Products Not Found");
        }
      
   }

  const filtering = (productList : Product[], category: string, searchQuery: string) =>{
    let result = [...productList];
   
    // 1. Search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

  // 2. Filter
    if (category && category !== 'All') {
      result = result.filter((p) => p.category.toLocaleLowerCase() === category.toLocaleLowerCase())
    }

    return result;
  };

   useEffect(() => {

      if (localProducts === null || localProducts.length === 0) {
         getProducts();
      }
      const getFilteredProducts = filtering(productSlice.products, productSlice.category, productSlice.keyword);
      setLocalProducts(getFilteredProducts);
    //     eslint-disable-next-line react-hooks/exhaustive-deps
   }, [productSlice]);

    return (
   <>
      <Header showSearch={true}/>
      <ToastContainer 
      stacked
       className="mt-10"
          position="top-center"
          autoClose={200}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          // theme="light"
          transition={Zoom}
      />
       {
        loading ? <FallbackLoading /> :  
          <div className="flex">
        <CustomSidebar products={productSlice.products}/>
      <main className="w-full m-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{productSlice.category}</h1>
    <p className="text-base text-gray-600 mb-6">{localProducts.length } products found</p>
      <ProductListing products={localProducts} />
        </main> 
         </div>
       }
     
   </>
  )
}

export default ProductListingLayout;