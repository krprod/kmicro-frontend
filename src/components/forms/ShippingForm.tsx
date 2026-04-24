import { AppViewCss } from '@/common/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Input } from '../ui/input'
import type {  FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'

type FieldValues1 = {
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentOption: string;
};
interface ShippingFormProps<T extends FieldValues>{
  regi: UseFormRegister<FieldValues1>
  err: FieldErrors<T>
}

const ShippingForm: React.FC<ShippingFormProps<FieldValues>> = ({regi, err}: ShippingFormProps<FieldValues>) => {

  return (
    <div className={`${AppViewCss} p-6`}>
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <FontAwesomeIcon icon={faTruckFast} />
        Shipping Information
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* <mat-form-field> */}
        <div>
          <Input
            type="text"
            placeholder="First Name"
            required
            {...regi("firstName", { required: true })}
          />
          {err.firstName && (
            <span className="text-red-700">
              {String(err.firstName.message)}
            </span>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Last Name"
            required
            {...regi("lastName", { required: true })}
          />
          {err.lastName && (
            <span className="text-red-700">{String(err.lastName.message)}</span>
          )}
        </div>

        <div className="col-span-2">
          <Input
            type="text"
            placeholder="Address"
            className="col-span-2"
            required
            {...regi("address", { required: true })}
          />
          {err.address && (
            <span className="text-red-700">{String(err.address.message)}</span>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="City"
            required
            {...regi("city", { required: true })}
          />
          {err.city && (
            <span className="text-red-700">{String(err.city.message)}</span>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="State  / Province"
            required
            {...regi("state", { required: true })}
          />
          {err.state && (
            <span className="text-red-700">{String(err.state.message)}</span>
          )}
        </div>

        <div className="col-span-2">
          <Input
            type="text"
            placeholder="Contact Number"
            className="col-span-2"
            required
            {...regi("contact", { required: true })}
          />
          {err.contact && (
            <span className="text-red-700">{String(err.contact.message)}</span>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Zip Code"
            required
            {...regi("zipCode", { required: true })}
          />
          {err.zipCode && (
            <span className="text-red-700">{String(err.zipCode.message)}</span>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Country"
            required
            {...regi("country", { required: true })}
          />
          {err.country && (
            <span className="text-red-700">{String(err.country.message)}</span>
          )}
        </div>

        {/* </form> */}
      </div>
    </div>
  )
}

export default ShippingForm