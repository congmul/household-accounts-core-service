import { Schema } from "mongoose";

export interface IAccountBook {
  name: string;
  description?: string;
  beginningMonthCheck?: {
    [date: string]: {
      // Additional properties can be added here
      isCopiedBudget: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountBookMember {
  accountBookId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  role: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
