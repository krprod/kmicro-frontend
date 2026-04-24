import { useLocation } from 'react-router'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './dashboard/AdminDashboard'
import { AdminProducts} from './products/AdminProducts'
import AdminUsers from './users/AdminUsers'
import AdminOrders from './orders/AdminOrders'
import Profile from '../user-pages/Profile'
import DocPage from './docs/DocPage'
import Notifications from './notifications/Notifications'

const Admin = () => {
       const location  = useLocation();
  return (
    <div className='flex'>
        <AdminSidebar/>
            <main className="w-full m-4">
            {
                  location.pathname === "/admin/dashboard" && <AdminDashboard/>
            }
            {
                  location.pathname === "/admin/products" && <AdminProducts/>
            }
             {
                  location.pathname === "/admin/orders" && <AdminOrders/>
            }  
                {
                  location.pathname === "/admin/users" && <AdminUsers/>
            }
             {
                  location.pathname === "/admin/profile" && <Profile/>
            }    
            {
                  location.pathname === "/admin/docs" && <DocPage/>
            } 
                {
                  location.pathname === "/admin/notifications" && <Notifications/>
            } 
                </main> 
       
    </div>
  )
}

export default Admin