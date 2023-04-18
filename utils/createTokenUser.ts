import { User } from "../types/authMiddlewareTypes";

export const createTokenUser = (user: User) => {
  return { name: user.name, userId: user._id, role: user.role };
};
