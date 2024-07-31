export type ITransactionType = "income" | "expense";

export interface ITransaction {
  userId: string;
  date: Date; // 2024-07-28T00:00:00
  amount: number;
  category: string;
  note: string;
  type: ITransactionType;
  paymentMethod: string;
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
  paymentMethod: string;
}

export interface ITransactionUpdatePayload {
  date?: Date; // 2024-07-28T00:00:00
  amount?: number;
  category?: string;
  note?: string;
  type?: ITransactionType;
  paymentMethod?: string;
}
