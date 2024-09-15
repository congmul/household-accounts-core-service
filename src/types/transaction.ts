export type ITransactionType = "income" | "expense";

export interface ITransaction {
  userId: string;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  category: string;
  subcategory: string;
  note: string;
  type: ITransactionType;
  paymentMethod: string;
  fixedExpenseMonthly: boolean;
  fixedSeriesId: string;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionCreatePayload {
  userId: string;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  category?: string;
  subcategory?: string;
  note?: string;
  type: ITransactionType;
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
  fixedExpenseMonthly?: boolean;
  fixedSeriesId?: string;
  endDate?: Date;
  paymentMethod?: string;
}
