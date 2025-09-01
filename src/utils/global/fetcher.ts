/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Method } from "axios";

export type FetcherParams = Record<string, any> | undefined;

export interface FetcherOptions {
  method?: Method;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  params?: FetcherParams; // Query params for GET
}

export const fetcher = async <T>(url: string, options: FetcherOptions = {}): Promise<T> => {
  const { method = "GET", data, headers, params } = options;

  console.log(url);
  try {
    const res = await axios.request<T>({
      url,
      method,
      headers,
      params,
      data,
    });

    return res.data;
  } catch (err: any) {
    const error = new Error(err.message || "An error occurred while fetching the data.");
    throw Object.assign(error, {
      info: err.response?.data ?? null,
      status: err.response?.status ?? null,
    });
  }
};
