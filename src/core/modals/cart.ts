import { type Product } from "./product"

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartItemApi {
  user_id: number
  product_id: number
  quantity: number
  price: number
  img: string
  product_name: string
}

export function transformCartForApi(
  product: Product,
  quantity: number,
  userId: number
) {
  const apiData:CartItemApi = {
          user_id: 0,
          product_id: 0,
          quantity: 0,
          price: 0,
          img: "",
          product_name: ""
  }
  apiData.img = product.image
  apiData.product_id = product.id
  apiData.price = product.price
  apiData.product_name = product.name
  apiData.quantity = quantity
  apiData.user_id = userId
  return apiData
}

export function transformAllCartItemForApi(cartItems: CartItem[], userId: number){
        const dataForApi: CartItemApi[] = [];
	cartItems.map((item) => {
		dataForApi.push({
                        user_id: userId,
                        product_id: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price,
                        img: item.product.image,
                        product_name: item.product.name,
        	});
        });
    	return dataForApi;
}

export type productQtyCheck = {id: number, qty: number};
type productQtyCheckResponseError = {id: number, message: string}
export type productQtyCheckResponse = {successIds: number[], errors: productQtyCheckResponseError[] };

export function transformCartItemsForProductApi(cartItems: CartItemApi[]){
        const dataForApi: productQtyCheck[] = [];
	cartItems.map((item) => {
		dataForApi.push({
                        id: item.product_id,
                        qty: item.quantity,
        	});
        });
    	return dataForApi;
}