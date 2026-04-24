import { useCallback, useState } from "react"
import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios"
import { useAppDispatch, useAppSelector } from "@/stores/store"
import { toast } from "react-toastify"
import type { ErrorResponseDTO } from "@/core/modals/apiRespose"
import { useNavigate } from "react-router"
import { logout } from "@/stores/slice/authSlice"

interface ApiResponse<TResponse = unknown> {
  data?: TResponse
  error?: unknown
  success: boolean
  status?: number
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

// Create axios instance with default config to handle CORS
const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to handle CORS
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any default headers here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle CORS errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Check for CORS errors
    if (error.message?.includes("CORS") && !error.response && error.request) {
      const corsError = new Error(
        "CORS Error: Unable to connect to the server. Please check if the server allows cross-origin requests or use a proxy."
      )
      // console.log("KK", error);
      return Promise.reject(corsError)
    }
    if (
      error.code === "ERR_NETWORK" ||
      error.message?.includes("Network Error") ||
      (!error.response && error.request)
    ) {
      const networkError = new Error(
        "NETWORK ERROR: Unable to connect to the server. Please check if the server is up and running"
      )
      // console.log("KK2", error);
      return Promise.reject(networkError)
    }
    return Promise.reject(error)
  }
)

export const useApi = () => {
        
  const [loading, setLoading] = useState(false)
  const {token: loginToken} = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const callApi = useCallback(

    async <TResponse = unknown, TRequest = unknown>(
      method: HttpMethod,
      url: string,
      data?: TRequest,
      config: AxiosRequestConfig = {}
    ): Promise<ApiResponse<TResponse>> => {
        setLoading(true)     
      try {
        const updatedConfig: AxiosRequestConfig = {
          ...config,
          headers: {
            "Content-Type": "application/json",
            ...config.headers,
            Authorization: loginToken ? `Bearer ${loginToken}` : "",
            withCredentials: true,
          },
          timeout: 5000,
        }
        let response: AxiosResponse<TResponse>
        switch (method) {
          case "GET":
            response = await axiosInstance.get<TResponse>(url, updatedConfig)
            break
          case "POST":
            response = await axiosInstance.post<TResponse>(
              url,
              data,
              updatedConfig
            )
            break
          case "PUT":
            response = await axiosInstance.put<TResponse>(
              url,
              data,
              updatedConfig
            )
            break
          case "DELETE":
            response = await axiosInstance.delete<TResponse>(url, updatedConfig)
            break
          default:
            throw new Error("Unsupported HTTP method")
        }
        return { data: response.data, success: true, status: response.status }
      } 
      catch (err) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>

          console.log("EXIOS", {...axiosError})

          if(axiosError.response?.status === 401 || axiosError.response?.status === 402 || axiosError.response?.status === 403) {
                toast.error((axiosError.response?.data as ErrorResponseDTO)?.errorMessage || "Unauthorized access");
                dispatch(logout());
                navigate("/unauthorized");
          }

          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Request failed"

          return {
            data: axiosError.response?.data as TResponse | undefined,
            error: errorMessage,
            success: false,
            status: axiosError.response?.status,
          }
        }
        // Handle non-Axios errors (including CORS errors caught by interceptor)
        const errorMessage = err instanceof Error ? err.message : String(err)
        console.error("API Error:", err)
        return {
          error: errorMessage,
          success: false,
        }
      } finally {
        setLoading(false)
      }
    },
    [loginToken, dispatch, navigate]
  )

  return { callApi, loading }
}
