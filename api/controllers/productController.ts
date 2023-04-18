import { Request, Response } from "express";

export const createProduct = (req: Request, res: Response) => {
  res.send("create product");
};
export const getAllProducts = (req: Request, res: Response) => {
  res.send("get all products");
};
export const getSingleProduct = (req: Request, res: Response) => {
  res.send("get single product");
};
export const updateProduct = (req: Request, res: Response) => {
  res.send("update product");
};
export const deleteProduct = (req: Request, res: Response) => {
  res.send("delete product");
};
export const uploadImage = (req: Request, res: Response) => {
  res.send("upload product");
};
