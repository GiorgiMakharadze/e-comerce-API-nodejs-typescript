import { Document, Types } from "mongoose";

export interface IOrderSchema extends Document {
  _id: string;
  tax: number;
  subtotal: number;
  total: number;
  shippingFee: number;
  cartItems: any[];
  status: string;
  user?: Types.ObjectId;
  clientSecret: string;
  paymentIntentId: string;
}

export interface ISingleCartItemSchema extends Document {
  name: string;
  image: string;
  price: number;
  amount: number;
  product?: Types.ObjectId;
}
