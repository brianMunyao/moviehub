import { IPaginatedResponse } from "./IPaginatedResult";

export type IResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type IGETPaginatedResponse<T> = IPaginatedResponse<T> & {
  isLoading: boolean;
  error: unknown;
};
