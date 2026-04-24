import { NavLink } from 'react-router';
import HeaderActionPublic from './header-actions/HeaderActionPublic';
import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setCategory } from '@/stores/slice/productSlice';

interface HeaderProps{
  showSearch : boolean;
}

const Header : React.FC<HeaderProps> = ({showSearch}: HeaderProps) => {

  const dispatch = useDispatch();

  return (
    <div className='w-full elevated py-2 shadow-md mb-2' >
       <div className="max-w-300 mx-auto w-full flex justify-between items-center px-6 lg:px-0">
        <span  className="text-2xl  font-semibold text-gray-900">
          <NavLink to="/products/all">KMICRO</NavLink>
        </span>
        {
          showSearch && <div className='w-100 flex'>
          <Input type='text' name='searchQuery' className='hidden md:block' placeholder='Search Product By Name' onChange={(e) =>{
             dispatch(setSearchQuery(e.target.value));
             dispatch(setCategory("All")); 
            // console.log(e.target.value)
          }}/>
{/*           <Button  onClick={()=>{
                        // distpatch(setSearchQuery()) 
                      }}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </Button> */}
        </div>
        }
        
        <HeaderActionPublic />
    </div>
    </div>
  )
}

export default Header