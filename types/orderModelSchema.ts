import { Document, Types } from "mongoose";

export interface IOrderSchema extends Document {
  _id: string;
  tax: number;
  subtotal: number;
  total: number;
  shippingFee: number;
  orderItems: any[];
  status: string;
  user?: Types.ObjectId;
  clientSecret: string;
  paymentIntentId: string;
}

export interface IOrderItemSchema extends Document {
  _id: string;
  name: string;
  image: string;
  price: number;
  amount: number;
  product?: Types.ObjectId;
}
