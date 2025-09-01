import { StatusCodes } from "http-status-codes";

type Params = {
  data?: Record<string, unknown>;
  statusCode?: StatusCodes;
  message?: string;
};

export const handleHttpSuccessResponse = ({
  data,
  statusCode = StatusCodes.OK,
  message = "Success",
}: Params) => {
  return new Response(
    JSON.stringify({
      success: true,
      data,
      message,
    }),
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
