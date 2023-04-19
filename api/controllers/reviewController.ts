import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Review from "../models/Review";
import Product from "../models/Product";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import { checkPremissions } from "../../utils";
import { BadRequestError, NotFoundError } from "../errors";

export const createReview = async (req: RequestWithUser, res: Response) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user?.userId,
  });
  if (alreadySubmitted) {
    throw new BadRequestError("Already sunbmitted review for this product");
  }

  req.body.user = req.user?.userId;

  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

export const getAllReviews = async (req: Request, res: Response) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

export const getSingleReview = async (req: Request, res: Response) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

export const updateReview = async (req: RequestWithUser, res: Response) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }

  if (review.user) {
    checkPremissions(req.user, review.user);
  }
  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

export const deleteReview = async (req: RequestWithUser, res: Response) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }

  if (review.user) {
    checkPremissions(req.user, review.user);
  }

  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Review Removed" });
};

export const getSingleProductReviews = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ reviews, cound: reviews.length });
};
