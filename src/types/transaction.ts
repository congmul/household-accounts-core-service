export type ITransactionType = "income" | "expense";

export interface ITransaction {
  userId: string;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  category: string;
  note: string;
  type: ITransactionType;
  paymentMethod: string;
  fixedExpense: string; // none, daily, weekly, monthly, annually
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionCreatePayload {
  userId: string;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  category?: string;
  note?: string;
  type: ITransactionType;
  fixedExpense: string; // none, daily, weekly, monthly, annually
  paymentMethod: string;
}

export interface ITransactionUpdatePayload {
  date?: Date; // 2024-07-28T00:00:00
  amount?: number;
  category?: string;
  note?: string;
  type?: ITransactionType;
  fixedExpense?: string; // none, daily, weekly, monthly, annually
  paymentMethod?: string;
}
