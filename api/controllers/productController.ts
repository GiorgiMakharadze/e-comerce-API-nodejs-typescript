import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import { NotFoundError } from "../errors";

export const createProduct = async (req: RequestWithUser, res: Response) => {
  req.body.user = req.user?.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};
export const getSingleProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
export const updateProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
export const deleteProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }
  await product.remove();

  res.status(StatusCodes.OK).json({ msg: " Product Removed" });
};
export const uploadImage = async (req: Request, res: Response) => {
  res.send("upload product");
};
