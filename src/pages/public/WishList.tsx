import EmptyWishList from "@/components/wishlist/EmptyWishList";
import MyWishList from "@/components/wishlist/MyWishList"
import { useAppSelector } from "@/stores/store";

const WishList = () => {
    const wishlistItems = useAppSelector((state) => state.cart.wishlist);
  return (  
    wishlistItems &&  wishlistItems.length > 0 ? <MyWishList products={wishlistItems} /> : <EmptyWishList />
  );
}

export default WishList;