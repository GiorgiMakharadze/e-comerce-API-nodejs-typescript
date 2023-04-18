import { Request as ExpressRequest } from "express";

export type User = {
  userId?: string;
  name?: string;
  role?: string;
  payloadId?: string;
  _id?: string;
};

export interface RequestWithUser extends ExpressRequest {
  user?: User | undefined;
}
