import { Document, Types } from "mongoose";

export interface IReviewSchema extends Document {
  _id: string;
  rating: number;
  title: string;
  comment: string;
  user?: string;
  product?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
