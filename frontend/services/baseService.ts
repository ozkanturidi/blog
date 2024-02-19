import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class BaseService {
  private axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:1337/api/",
    timeout: 5000, // Set a timeout value if needed
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${process.env.API_KEY}`,
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials": true,
    //   "Access-Control-Allow-Methods": "*",
    //   "Access-Control-Allow-Headers": "*",
    // },
  });

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      url,
      config
    );
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config
    );
    return response.data;
  }
}

export default BaseService;
