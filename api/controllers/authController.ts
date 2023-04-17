import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequestError } from "../errors/bad-request";

export const register = async (req: Request, res: Response) => {
  const { email } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req: Request, res: Response) => {
  res.send("login");
};

export const logout = async (req: Request, res: Response) => {
  res.send("logout");
};
