import { Document, Types } from "mongoose";

export interface IProductSchema extends Document {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  company: string;
  colors: string[];
  featured: boolean;
  freeShipping: boolean;
  inventory: Number;
  averageRating: Number;
  numOfReviews: Number;
  user?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
