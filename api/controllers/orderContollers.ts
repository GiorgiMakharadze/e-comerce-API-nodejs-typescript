import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../models/Order";
import Product from "../models/Product";
import { checkPremissions } from "../../utils";
import { BadRequestError } from "../errors";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import { IProductSchema } from "../../types/productModelSchemaTypes";

const fakeStripeAPI = async ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

export const createOrder = async (req: RequestWithUser, res: Response) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("Please provide tax and shipping fee");
  }

  let orderItems: any[] = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new BadRequestError(`No product with id: ${item.product}`);
    }
    const { name, price, image, _id } = dbProduct as IProductSchema;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    orderItems = [...orderItems, singleOrderItem];
    subtotal += item.amount * price;
  }
  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user?.userId,
  });

  console.log(subtotal);

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

export const getSingleOrder = async (req: RequestWithUser, res: Response) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new BadRequestError(`No order with id: ${orderId}`);
  }
  checkPremissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

export const getCurrentUserOrders = async (
  req: RequestWithUser,
  res: Response
) => {
  const orders = await Order.find({ user: req.user?.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

export const updateOrder = async (req: RequestWithUser, res: Response) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new BadRequestError(`No order with id: ${orderId}`);
  }

  if (order.user) {
    checkPremissions(req.user, order.user);
  }
  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};
