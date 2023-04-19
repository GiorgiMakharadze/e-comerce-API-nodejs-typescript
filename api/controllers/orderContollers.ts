import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createOrder = async (req: Request, res: Response) => {
  res.send("createOrder");
};
export const getAllOrders = async (req: Request, res: Response) => {
  res.send("getAllOrders");
};
export const getSingleOrder = async (req: Request, res: Response) => {
  res.send("getSingleOrder");
};
export const getCurrentUserOrders = async (req: Request, res: Response) => {
  res.send("getCurrentUserOrders");
};
export const updateOrder = async (req: Request, res: Response) => {
  res.send("updateOrder");
};
