import { Request, Response } from "express";
import path from "path";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product";
import { IUploadFile } from "../../types/uploadFileTypes";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import { BadRequestError, NotFoundError } from "../errors";

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
  if (!req.files) {
    throw new BadRequestError("No File Uploaded");
  }
  const productImage = req.files?.image as IUploadFile;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please Upload Image");
  }

  const maxSize = parseInt(process.env.IMAGE_MAX_SIZE!);

  if (productImage.size > maxSize) {
    throw new BadRequestError(`Please Upload Image smaller then ${maxSize} KB`);
  }

  const imagePath = path.join(
    __dirname,
    "../../../public/uploads/." + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};
