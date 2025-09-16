import { Schema } from "mongoose";

export interface IAssets {
  userId: string;
  accountBookId: Schema.Types.ObjectId;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}
