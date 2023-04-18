import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { isTokenValid } from "../../utils";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import { UnauthenticatedError } from "../errors";

export const authenticateUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token }) as JwtPayload;
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
