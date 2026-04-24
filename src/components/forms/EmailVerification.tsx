import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent } from "../ui/card"
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
} from "../ui/field"
import { Link, useNavigate, useParams } from "react-router"
import * as yup from "yup"
import { useForm, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import type {
        SignInParams,
        UserApiType,
} from "@/core/modals/userT"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
        faArrowRightToBracket,
        faCartShopping,
        faCircleCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons"
import usePrevLocation from "@/hooks/usePrevLocation"
import { useApi } from "@/hooks/useApi"
import { toast } from "react-toastify"
import type { ErrorResponseDTO } from "@/core/modals/apiRespose"


const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(30),
  }).required();

const EmailVerification: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [open, setOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const prevLocation = usePrevLocation();
  const { callApi } = useApi();

  const submission: SubmitHandler<SignInParams> = async (data: SignInParams) => {

        const resendTokenResponse = await callApi(  "POST",
                "/api/auth/resend-verify-user",
                 {email: data.email, password: data.password});

        if(resendTokenResponse.success){
                const userDto = resendTokenResponse.data as UserApiType;
                if(!userDto.is_active && !userDto.is_verified && userDto.id){
                        const actualResend = await callApi('POST', `/api/auth/resend-verification/${userDto.id}`);
                        if(actualResend.success){
                                toast.success("Mail Sent! Verify through mailed link",{autoClose:5000});
                                setIsMailSent(true);
                        }
                        
                        if(!actualResend.success){
                                const error = actualResend.data as ErrorResponseDTO;
                                toast.error(error?.errorMessage || "Mail not sent. Please try again.",{autoClose:5000});
                        }
                        console.log("Actual Resend Response:", actualResend)
                }
        }
        console.log("Token Verification Response:", resendTokenResponse)
  }

  useEffect(() => {
    ;(async function checkAuth() {
        if(!token) return;
      const response = await callApi("GET", "/api/auth/verify?token=" + token)

      if(response.success){
        const userDto = response.data as UserApiType;
                if(userDto.is_active && userDto.is_verified){
                        setIsVerified(true);
                        navigate(prevLocation && prevLocation !== "/signin" ? prevLocation : '/signup');
                }
      }

      if(!response.success){
                const error = response.data as ErrorResponseDTO
                toast.error(error.errorMessage,{autoClose:5000});
      }
//       console.log("Token Verification Check:", response)
    })()
  }, [navigate, callApi, token, prevLocation])

//   CONFIRMATION UI
   if (isVerified || isMailSent) {
    // navigate(prevLocation && prevLocation !== "/signin" ? prevLocation : '/user/profile');
    return (
      <div className="mx-auto max-w-300 py-6">
        <Card>
          <CardContent className="text-center">
                <FontAwesomeIcon icon={faCircleCheck}    className={`h-14 w-14 text-[100px]  mb-4 ${ isVerified ? 'text-green-500':'text-primary'}`}/>
            <h2 className={`text-2xl font-semibold ${ isVerified ? 'text-green-500':'text-primary'}`}>
              {
                isVerified ? 'Email Verification Succeed!' : ''
              }
              {
                  isMailSent?  'Verification Email Sent, Please check your mail!' : ''
              }
            </h2>
            <p className="text-base mb-4">
              Thank you for your time! You can now continue shopping.
            </p>
            <div className="m-4 flex justify-center">
              <Link to="/products" className="mr-4">
                <Button variant="secondary">
                  <FontAwesomeIcon icon={faCartShopping} />
                  Go To Shopping
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="secondary">
                  <FontAwesomeIcon icon={faArrowRightToBracket} />
                  Login To Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  } 

  return (
    <div className="mx-auto max-w-300 py-6">
      <div className={cn("flex flex-col gap-6")}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit(submission)}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">
                    Resend Email Verification Token
                  </h1>
                  <p className="text-sm text-balance text-muted-foreground">
                    Enter your credentials below to resend verifiaction token
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register("email", { required: true })}
                  />
                  <FieldDescription>
                    {errors.email && (
                      <span className="text-red-700">
                        {String(errors.email.message)}
                      </span>
                    )}
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="flex items-center justify-between gap-2">
                    <Input
                      type={open ? "text" : "password"}
                      required
                      {...register("password", { required: true })}
                    />
                    <span onClick={() => setOpen(!open)}>
                      {open ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </span>
                  </div>
                  <FieldDescription>
                    {errors.password && (
                      <span className="text-red-700">
                        {String(errors.password.message)}
                      </span>
                    )}
                  </FieldDescription>
                </Field>
                <Field>
                  <Button type="submit">Resend Link</Button>
                </Field>
              </FieldGroup>
            </form>
            <div className="relative hidden bg-muted md:block">
              <img
                src="https://plus.unsplash.com/premium_photo-1681487927178-ebfd0888a940"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EmailVerification
