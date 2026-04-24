import type { CheckoutApiType } from "./order";

export interface UserT {
  id: number;
  name: string;
  email: string;
  contact?: string;
  imageUrl?: string;
}

export interface LoginResponse{
        status: string; 
         token: string; 
          message: string;
          user: UserApiType | null;
}

export interface UserTokenVerifiaction {
   password: string;
   email: string;
  token: string | null;
  isAuthenticated?: boolean;
}

export interface SignUpParamsT {
  name: string;
  email: string;
  password: string;
  checkout?: boolean;
  dialogId?: string;
}

export interface AddressGridType {
  id?: number;
  name: string;
  address: string;
  phone: string;
  isMain: boolean;
  realAdd: AddressFormType;
}

export interface AddressFormType {
  id?: number;
  user_id?: number;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export type UserAddressApi = Omit<
  CheckoutApiType,
  "email" | "paymentMode" | "address_id"
>;

export type SignInParams = Omit<SignUpParamsT, "name">;

export function castUserAddressApiToAddressGridType(
  addr: UserAddressApi
): AddressGridType {
  return {
    name: addr.name,
    address: `${addr.shipping_address}, ${addr.city}, ${addr.state} ${addr.zip_code}, ${addr.country}`,
    phone: addr.contact,
    isMain: false,
    realAdd: {
      address_line1: addr.shipping_address,
      address_line2: "",
      city: addr.city,
      state: addr.state,
      zip_code: addr.zip_code,
      country: addr.country,
    },
  };
}

export function castAddressFormApiToAddressGripType(
  data: AddressFormType,
  displayName: string,
  contactPhone?: string
) {
  return {
    id: data.id,
    name: displayName,
    address: `${data.address_line1}, ${data.address_line2}, ${data.city}, ${data.state} ${data.zip_code}, ${data.country}`,
    realAdd: data,
    phone: contactPhone?.trim() ? contactPhone : "—",
    isMain: false,
  };
}

export interface UserAddressApiType {
      id: number,
      city: string,
      state: string,
      country: string,
      user_id: number,
      address_line1: string,
      address_line2: string,
      zip_code: string
    }
export interface UserApiType{
  id: number;
  login_name: string,
  email: string,
  avtar: string,
  latitude: number,
  longitude: number,
  addresses:UserAddressApiType[],
  roles: string[],
  loggedIn: boolean,
  first_name: string,
  last_name: string,
  contact: string,
  last_login_time: string,
  is_active: boolean,
  is_verified: boolean
}