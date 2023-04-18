import { Document, Types } from "mongoose";

export interface IProductSchema extends Document {
  _id: string;
  name: string;
  price: Number;
  desctiprion: string;
  image: string;
  category: string;
  company: string;
  colors: string[];
  featured: boolean;
  freeShipping: boolean;
  inventory: Number;
  averageRating: Number;
  user?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
