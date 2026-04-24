import type { UserAddressApi } from "./userT";

export interface AddressGridType{
        id?: number;
         name: string;
        address: string;
        phone: string;
        isMain: boolean;
        realAdd: AddressFormType;
}


export interface AddressFormType{
        id?: number;
        user_id?: number;
        address_line1: string;
        address_line2: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    }

    // export function castUserAddressApiToAddressGridType(addr: UserAddressApi): AddressGridType {
export function castUserAddressApiToAddressGridType(addr: UserAddressApi, realAdd: AddressFormType): AddressGridType {
        return {
          name: addr.name,
          address: `${addr.shipping_address}, ${addr.city}, ${addr.state} ${addr.zip_code}, ${addr.country}`,
          phone: addr.contact,
          isMain: false,
          realAdd: realAdd,
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