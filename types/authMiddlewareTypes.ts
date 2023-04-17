import { Request as ExpressRequest } from "express";

export interface RequestWithUser extends ExpressRequest {
  user?: { userId: string; name?: string; role?: string };
}

export interface TokenPayload {
  userId: string;
  name: string;
}
