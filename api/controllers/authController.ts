import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequestError } from "../errors/bad-request";
import { attachCookiesToResponse } from "../../utils";

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  //first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

export const login = async (req: Request, res: Response) => {
  res.send("login");
};

export const logout = async (req: Request, res: Response) => {
  res.send("logout");
};
