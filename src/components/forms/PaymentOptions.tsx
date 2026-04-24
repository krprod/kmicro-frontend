import { AppViewCss } from '@/common/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React from 'react'
import { Controller, type Control, } from 'react-hook-form'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'

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

interface PaymentOptionsProps{
 controller:  Control<FieldValues1>
}
// interface PaymentOptionsProps<T extends FieldValues>{
//  regi?: UseFormRegister<T>;
//  conta: Control<T>
// }
const PaymentOptions:React.FC<PaymentOptionsProps> = ({controller}: PaymentOptionsProps) => {
  return (
    <div className={`${AppViewCss} p-6`}>
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <FontAwesomeIcon icon={faCreditCard} />
        Payment Options
      </h2>
     {/*  <div>
        <RadioGroup defaultValue="paypal" className='flex items-center gap-3'>
              <div className='flex items-center gap-3'>
            <RadioGroupItem value="stripe" id="stripe"  {...regi("paymentOption", {required: true})}/>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
              alt="Stripe"
              className="h-6"
            />
          </div>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value="paypal" id="paypal"  {...regi("paymentOption", {required: true})}/>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f9/PayPal-Logo-2022.png"
              alt="PayPal"
              className="h-14"
            />
          </div>
          <div className='flex items-center gap-3'>
            <RadioGroupItem value="paytm" id="paytm"  {...regi("paymentOption", {required: true})}/>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
              alt="Paytm"
              // className="h-6"
            />
          </div>
        </RadioGroup>
      </div> */}
      <div>
<Controller
      control={controller}
      name="paymentOption"
      rules={{ 
        required: true,
        validate: (value) => {
            if (value === "paytm") {
              return "Paytm is currently under maintenance. Choose another.";
            }
            return true;
          }
      }}
      render={({ field , fieldState}) => (
        <div>
        <RadioGroup
          value={field.value}
          onValueChange={field.onChange} // Updates React Hook Form state
          // className="flex items-center gap-3"
          className={fieldState.invalid ? "border-red-500 flex items-center gap-3" : "flex items-center gap-3"}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="stripe" id="stripe" />
            {/* <Label htmlFor="stripe"> */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                alt="Stripe"
                className="h-6"
              />
            {/* </Label> */}
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="paypal" id="paypal" />
            {/* <Label htmlFor="paypal"> */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f9/PayPal-Logo-2022.png"
                alt="PayPal"
                className="h-14"
              />
            {/* </Label> */}
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="paytm" id="paytm" />
            {/* <Label htmlFor="paytm"> */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                alt="Paytm"
                className="h-6"
              />
            {/* </Label> */}
          </div>
        </RadioGroup>
        {fieldState.error && (
        <p className="text-red-500 text-sm mt-2">{fieldState.error.message}</p>
      )}
        </div>
      )}
    />
  
      </div>
    </div>
  )
}

export default PaymentOptions