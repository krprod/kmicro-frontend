
import React from 'react'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'

interface CustomAlertBoxProps{
        title?: string;
        msg?: string;
        // icon?: ReactNode;
}
const CustomAlertBox: React.FC<CustomAlertBoxProps> = ({title, msg}) => {
  return (
        <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <AlertTitle>{title ? title : "Payment successful"}</AlertTitle>
        <AlertDescription>
          {
                msg ? msg : "Your payment of $29.99 has been processed. A receipt has been sent to your email address."
          }
        </AlertDescription>
      </Alert>
        </div>
  );
};

export default CustomAlertBox;