import axios, { AxiosResponse, AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import authConfig, { BASE_URL } from 'src/configs/auth'

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

interface ErrorResponse {
  message: string
}

const handleResponse = <T>(response: AxiosResponse<T>): T => {
  if (response.status === 200 || response.status === 201) {
    return response.data
  } else {
    throw new Error(`Request failed with status ${response.status}`)
  }
}

const handleError = (error: AxiosError<ErrorResponse, any>): never => {
  if (error.response) {
    if (error?.response?.status === 401) {
      localStorage.removeItem('userData')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      if (window !== undefined) {
        window.location.replace('/')
      }
    }
    toast.error(error?.response?.data?.message || '')
    throw new Error(`Server responded with error: ${error.response.data.message}`)
  } else if (error.request) {
    throw new Error('No response received from the server')
  } else {
    throw new Error(`Error setting up the request: ${error.message}`)
  }
}

const getAuthorizationHeader = () => {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return token ? { Authorization: `Bearer ${token}` } : {}
}

const getFormDataHeader = () => {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } : {}
}

const get = async <T>(url: string, params: any = {}): Promise<T | undefined> => {
  try {
    const response = await apiService.get<T>(url, { params, headers: getAuthorizationHeader() })

    return handleResponse(response)
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse, any>)
  }
}

const post = async <T>(url: string, data: any): Promise<T | undefined> => {
  try {
    const response = await apiService.post<T>(url, data, { headers: getAuthorizationHeader() })

    return handleResponse(response)
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse, any>)
  }
}

const put = async <T>(url: string, data: any): Promise<T | undefined> => {
  try {
    const response = await apiService.put<T>(url, data, { headers: getAuthorizationHeader() })

    return handleResponse(response)
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse, any>)
  }
}

const patch = async <T>(url: string, data: any): Promise<T | undefined> => {
  try {
    const response = await apiService.patch<T>(url, data, { headers: getAuthorizationHeader() })

    return handleResponse(response)
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse, any>)
  }
}

const del = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await apiService.delete<T>(url, { headers: getAuthorizationHeader() })

    return handleResponse(response)
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse, any>)
  }
}

const formDataPost = async <T>(url: string, data: any): Promise<T | undefined> => {
  try {
    const response = await apiService.post<T>(url, data, { headers: getFormDataHeader() })

    return handleResponse(response)
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse, any>)
  }
}

const formDataPut = async <T>(url: string, data: any): Promise<T | undefined> => {
  try {
    const response = await apiService.put<T>(url, data, { headers: getFormDataHeader() })

    return handleResponse(response)
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse, any>)
  }
}

export { get, post, put, patch, del, formDataPost, formDataPut }
