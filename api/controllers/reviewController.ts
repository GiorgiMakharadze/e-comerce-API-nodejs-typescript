import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ReviewSchema from "../models/Review";

export const createReview = async (req: Request, res: Response) => {
  res.send("create review");
};
export const getAllReviews = async (req: Request, res: Response) => {
  res.send("getAllReviews");
};
export const getSingleReview = async (req: Request, res: Response) => {
  res.send("getSingleReview");
};
export const updateReview = async (req: Request, res: Response) => {
  res.send("updateReview");
};
export const deleteReview = async (req: Request, res: Response) => {
  res.send("deleteReview");
};
