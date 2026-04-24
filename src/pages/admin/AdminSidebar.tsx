import {  BellDotIcon, BookOpenText, Boxes, ChartNoAxesCombined, Tags, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import  { NavLink } from 'react-router';

interface Category {
  id: string;
  name: string;
  path: string;
  icon?: ReactNode; // Optional: for Lucide icons or emojis
}

const categories: Category[] = [
  { id: '1', name: 'Dashboard', path: '/admin/dashboard', icon: <ChartNoAxesCombined /> },
  { id: '2', name: 'Products', path: '/admin/products', icon:<Tags /> },
  { id: '3', name: 'Orders', path: '/admin/orders', icon: <Boxes /> }, // Example of using an emoji as an icon
  { id: '4', name: 'Users', path: '/admin/users', icon: <Users /> },
  { id: '5', name: 'Notifications', path: '/admin/notifications', icon: <BellDotIcon /> },
  { id: '5', name: 'Docs', path: '/admin/docs', icon: <BookOpenText /> },
];
export default function AdminSidebar() {
  return (
   <aside className="w-64 h-screen bg-white border-r border-gray-200 p-4 sticky top-0 pt-4 hidden md:block">
         {/* <h2 className="text-xl font-bold mb-6 px-2 text-gray-800">Categories</h2> */}
         
         <nav className="space-y-1">
           {categories.map((category: Category) => (
             <NavLink
               key={category.id}
               to={category.path}
               // The 'isActive' property allows us to toggle Tailwind classes dynamically
               className={({isActive}) => `
                 flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                 ${isActive 
                   ? 'bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600' 
                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
               `}
               data-value={category.name}
        //        onClick={()=>{
        //          const catName = category.name === "All Products" ? "" : category.name
        //          distpatch(setCategory(catName)) 
        //        }}
             >
              <div className="flex items-center space-x-3">
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </div>
             </NavLink>
           ))}
         </nav>
       </aside>
  )
}
