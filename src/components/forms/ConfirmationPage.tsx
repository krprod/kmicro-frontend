import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import  { Card, CardContent } from '../ui/card'

interface ConfirmationPageProps{
        textColor: string;
        message1: string;
        message2?: string;
        // buttons: React.ReactNode;
          children?: React.ReactNode;
}
const ConfirmationPage: React.FC<ConfirmationPageProps> = ({textColor, message1,message2, children }: ConfirmationPageProps) => {
  return (
      <div className="mx-auto max-w-200 py-6">
        <Card>
          <CardContent className="text-center">
                <FontAwesomeIcon icon={faCircleCheck}    className={`h-14 w-14 text-[100px]  mb-4 ${ textColor}`}/>
            <h2 className={`text-2xl font-semibold ${ textColor }`}>
              {message1}
            </h2>
            <p className="text-base mb-4">
              {
                message2 ? message2 : 'Thank you for your time! You can now continue shopping.'
              }
            </p>
            <div className="m-4 flex justify-center">
              {
                children
              }
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

export default ConfirmationPage