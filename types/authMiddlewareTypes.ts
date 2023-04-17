import { Request as ExpressRequest } from "express";

export interface RequestWithUser extends ExpressRequest {
  user?: { userId: string; name?: string };
}

export interface TokenPayload {
  userId: string;
  name: string;
}
