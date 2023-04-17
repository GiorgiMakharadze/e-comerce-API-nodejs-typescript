import { Response, NextFunction } from "express";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import { UnauthenticatedError } from "../errors";
import { isTokenValid } from "../../utils";

export const authenticateUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const payload = isTokenValid(token);
    if (typeof payload === "string") {
      throw new UnauthenticatedError(payload);
    }

    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      throw new UnauthenticatedError("Unauthorized to access this route");
    }
    next();
  };
};
