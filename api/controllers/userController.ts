import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  res.send("get all users");
};
export const getSingleUser = async (req: Request, res: Response) => {
  res.send("get Signle users");
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
