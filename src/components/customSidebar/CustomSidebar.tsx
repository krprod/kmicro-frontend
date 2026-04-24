import type { ProductsProp } from '@/core/modals/product';
import { convertToTitleCase } from '@/lib/textUtils';
import React from 'react';
import { useDispatch} from 'react-redux';
import { NavLink } from 'react-router';
import { setCategory } from '@/stores/slice/productSlice';
import { useAppSelector } from '@/stores/store';

interface Category {
  id: string;
  name: string;
  path: string;
  icon?: string; // Optional: for Lucide icons or emojis
}

const categories: Category[] = [
  { id: '1', name: 'All Products', path: '/products/all' },
  { id: '2', name: 'Electronics', path: '/products/electronic' },
  { id: '3', name: 'Fashion', path: '/products/fashion' },
  { id: '4', name: 'Home & Garden', path: '/products/home' },
  { id: '5', name: 'Beauty', path: '/products/beauty' },
  { id: '6', name: 'Fitness', path: '/products/Fitness' },
];

const CustomSidebar: React.FC<ProductsProp> = ({products}: ProductsProp) => {
  const distpatch = useDispatch();
  const catego = useAppSelector((state) => state.products.category);
    const proCatFn = () => {
        if(products?.length ==0 ) return categories;

        const allCategories =  products?.length ? products?.map((p) => p.category.toLocaleLowerCase()) : [];
        const uniqueCategories = Array.from(new Set(['all', ...allCategories]));    
        
        const proCat: Category[] = uniqueCategories.map((category,index)=>(
            { id: (index+1).toString() , name: convertToTitleCase(category), path: '/products/'+category }
        ));
       return proCat;
    }

  return (
  <aside className="w-64 h-screen bg-white border-r border-gray-200 p-4 sticky top-0 pt-4 hidden md:block">
      
      <nav className="space-y-1">
        {proCatFn().map((category: Category) => (
          <NavLink
            key={category.id}
            to={category.path}
            // The 'isActive' property allows us to toggle Tailwind classes dynamically
            className={() => `
              flex items-center px-4 py-3 rounded-lg transition-colors duration-200
              ${category.name === catego 
                ? 'bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
            `}
            data-value={category.name}
            onClick={()=>{
              const catName = category.name === "All Products" ? "" : category.name
              distpatch(setCategory(catName)) 
            }}
          >
            {category.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default CustomSidebar