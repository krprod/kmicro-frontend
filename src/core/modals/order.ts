import { type CartItem } from "./cart"
import type { UserT } from "./userT"

export interface Order {
  id: string
  userId: number
  paymentStatus: "pending" | "success" | "failed"
  items: CartItem[]
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  totalAmount: number
  taxAmount: number
  shippingCost: number
  orderDate: Date
}

export interface OrderItemsApi {
  id: number
  quantity: number
  price: number
  product_id: number
  item_img: string
  item_name: string
}

export interface OrderApi {
  orderItems: OrderItemsApi[]
  id: number
  user_id: number
  order_date: string
  order_status: string
  subtotal: number
  total_amount: number
  payment_method: string
  transaction_id: string
  payment_status: string
  shipping_fee: number
  shipping_address: CheckoutApiType
  tracking_number: string
}

export interface CheckoutFormFieldType {
  firstName: string
  lastName: string
  contact: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  paymentOption: string
}

export interface CheckoutApiType {
  name: string
  email: string
  contact: string
  city: string
  state: string
  country: string
  address_id: number
  shipping_address: string
  zip_code: string
  paymentMode: string
}

export function mapCheckoutFormToApiType(formData: CheckoutFormFieldType, userData: UserT): CheckoutApiType {
        return {
        name: `${formData.firstName} ${formData.lastName}`,
        email: userData.email, // This should be populated with the user's email from the auth state
        contact: formData.contact, // This should be populated with the user's contact number from the auth state
        city: formData.city,
        state: formData.state,
        country: formData.country,
        address_id: 0, // This can be generated or fetched from the backend if needed
        shipping_address: formData.address,
        zip_code: formData.zipCode.toString(),
        paymentMode: formData.paymentOption,
        }
}
