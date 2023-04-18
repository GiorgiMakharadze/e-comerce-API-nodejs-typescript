import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import {
  createTokenUser,
  attachCookiesToResponse,
  checkPremissions,
} from "../../utils";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

export const getSingleUser = async (req: RequestWithUser, res: Response) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`);
  }
  checkPremissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

export const showCurrentUser = async (req: RequestWithUser, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

export const updateUser = async (req: RequestWithUser, res: Response) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user?.userId });

  if (user) {
    user.email = email;
    user.name = name;
    await user.save();
  }

  if (!user) {
    throw new NotFoundError("User not found");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const updateUserPassword = async (
  req: RequestWithUser,
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }
  if (oldPassword === newPassword) {
    throw new BadRequestError(
      "New password cannot be the same as old password"
    );
  }
  const user = await User.findOne({ _id: req.user?.userId });

  const isPasswordCorrect = await user?.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  if (user) {
    user.password = newPassword;
    await user.save();
  }
  res.status(StatusCodes.OK).json({ msg: "Password updated" });
};
