import { StatusCodes } from "http-status-codes";

export class HttpError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
  }
}

export const handleHttpErrorResponse = (
  error: unknown,
  statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
): Response => {
  let message = "An unexpected error occurred.";
  let status = statusCode;

  if (error instanceof HttpError) {
    message = error.message;
    status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
