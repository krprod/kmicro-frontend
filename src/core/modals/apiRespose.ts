
export interface ErrorResponseData {
   timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

export interface ErrorResponseDTO{
        apiPath: string;
        errorCode: number;
        errorMessage: string;
        errorTime: string
}