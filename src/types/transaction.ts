export type ITransactionType = "income" | "expense";

export interface ITransaction {
  userId: string;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  category: string;
  note: string;
  type: ITransactionType;
  paymentMethod: string;
  fixedExpense: string; // "does_not_repeat" | "every_day" | "every_week" | "every_month" | "every_year"
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
  fixedExpense: string; // "does_not_repeat" | "every_day" | "every_week" | "every_month" | "every_year"
  paymentMethod: string;
}

export interface ITransactionUpdatePayload {
  date?: Date; // 2024-07-28T00:00:00
  amount?: number;
  category?: string;
  note?: string;
  type?: ITransactionType;
  fixedExpense?: string; // "does_not_repeat" | "every_day" | "every_week" | "every_month" | "every_year"
  paymentMethod?: string;
}
