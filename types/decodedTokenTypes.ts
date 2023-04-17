import { Request } from "express";

export interface DecodedToken {
  id: number;
  username: string;
}

export interface RequestWithUser extends Request {
  user?: DecodedToken;
}
