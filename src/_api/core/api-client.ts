import type { AxiosRequestConfig } from "axios"
import { axiosInstance } from "./axios.instance"

export async function apiCall<TResponse, TBody = unknown>(
  path: string,
  method: AxiosRequestConfig["method"],
  body?: TBody
): Promise<TResponse> {
  // Because the response interceptor returns TResponse,
  // this resolves directly to TResponse (not AxiosResponse<TResponse>)
  return axiosInstance.request<TResponse>({
    url: path,
    method,
    data: body,
  }) as unknown as Promise<TResponse>
}
