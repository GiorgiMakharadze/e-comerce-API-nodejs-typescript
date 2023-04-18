import { UnauthorizedError } from "../api/errors";

export const checkPremissions = (requestUser: any, resourceUserId: string) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authorized to access this route");
};
