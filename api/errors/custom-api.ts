import { StatusCodes } from "http-status-codes";

export class CustomAPIError extends Error {
  statusCode?: number = StatusCodes.INTERNAL_SERVER_ERROR;
  constructor(message: string) {
    super(message);
  }
}
