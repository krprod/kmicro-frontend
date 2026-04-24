import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCartShopping, faHeart,} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router"
import { useAppSelector } from "@/stores/store"
import { Button } from "@/components/ui/button"
import UserHeaderAction from "./UserHeaderAction"
import AdminHeaderAction from "./AdminHeaderAction"

function HeaderActionPublic() {
  const cart = useAppSelector((state) => state.cart)
  const auth = useAppSelector((state) => state.auth)
  return (
    <div className="flex items-center gap-2">
      {/* Wishlist */}
      <Link to="/wishlist">
        <div className="flex rounded p-2 hover:bg-gray-100">
          {/* <FontAwesomeIcon icon="fa-solid fa-heart" className="text-2xl" /> */}
          <FontAwesomeIcon icon={faHeart} className="text-2xl text-primary" />
          <span className="flex h-3 w-3 items-center justify-center rounded-full font-bold text-red-700">
            {cart.wishlist && cart.wishlist.length}
          </span>
        </div>
      </Link>

      {/* Cart */}
      <Link to="/cart">
        <div className="flex rounded p-2 hover:bg-gray-100">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-xl text-primary"
          />
          <span className="flex h-3 w-3 items-center justify-center rounded-full font-bold text-red-700">
            {cart.cartItems && cart.cartItems.length}
          </span>
        </div>
      </Link>

      {/* SignIn & SignUp Button */}
      {
        !auth.user && !auth.token && (
                <div className="flex gap-2">
                <Link to="/signin">
                <Button variant="outline" className="w-full">
                Sign In
                </Button>
                </Link>
                <Link to="/signup">
                <Button className="w-full">Sign Up</Button>
                </Link>
                </div>
        )
      }

      {auth.user && auth.token && 
      (
        auth.isAdmin ? <AdminHeaderAction  user={auth.user} />: <UserHeaderAction user={auth.user} />
        )
      }
    </div>
  )
}

export default HeaderActionPublic
