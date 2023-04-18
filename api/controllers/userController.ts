import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { NotFoundError } from "../errors";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};
export const getSingleUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
export const showCurrentUser = async (req: Request, res: Response) => {
  res.send("show current users");
};
export const updateUser = async (req: Request, res: Response) => {
  res.send("update  users");
};
export const updateUserPassword = async (req: Request, res: Response) => {
  res.send("update User Password");
};
