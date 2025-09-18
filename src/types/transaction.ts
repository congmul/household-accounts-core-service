import { Schema } from "mongoose";

export type ITransactionType = "income" | "expense";

export interface ITransaction {
  userId: string;
  accountBookId: Schema.Types.ObjectId;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  category: string;
  subcategory: string;
  note: string;
  type: ITransactionType;
  paymentMethod: string;
  pending: boolean;
  fixedExpenseMonthly: boolean;
  fixedSeriesId: string;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionCreatePayload {
  userId: string;
  accountBookId: Schema.Types.ObjectId;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  category?: string;
  subcategory?: string;
  note?: string;
  type: ITransactionType;
  pending?: boolean;
  fixedExpenseMonthly: boolean;
  endDate?: Date;
  paymentMethod: string;
}

export interface ITransactionUpdatePayload {
  date?: Date; // 2024-07-28T00:00:00
  amount?: number;
  category?: string;
  subcategory?: string;
  note?: string;
  type?: ITransactionType;
  pending?: boolean;
  fixedExpenseMonthly?: boolean;
  fixedSeriesId?: string;
  endDate?: Date;
  paymentMethod?: string;
}
