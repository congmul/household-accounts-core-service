import { AccountBook, AccountBookMember } from "../models";
import logger from "../utils/logger";
import { ErrorMsg } from "../config/msgs";
import AppError from "../utils/errorHandler";
import mongoose from "mongoose";

export const accountbookService = {
  getAccountbooks: async (userId: string) => {
    try {
      const result = await AccountBookMember.find({ userId: userId })
        .populate("accountBookId")
        .lean();
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("account book").message, 500);
    }
  },

  createAccountbook: async ({
    name,
    description,
    userId,
  }: {
    name: string;
    description?: string;
    userId: string;
  }) => {
    try {
      let createdBookId: mongoose.Types.ObjectId | null = null;
      // 1) Create the account book
      const [book] = await AccountBook.create([{ name, description }]);
      createdBookId = book._id;

      // 2) Create owner membership (not default yet)
      await AccountBookMember.create([
        {
          accountBookId: book._id,
          userId: new mongoose.Types.ObjectId(userId),
          role: "owner",
          isDefault: true,
        },
      ]);
      // Optionally return the created book + owner membership
      const result = await AccountBook.findById(createdBookId).lean();
      return result;
    } catch (err: any) {
      logger.error(err);
      console.log(err);
      // Handle duplicate-key races gracefully
      if (err?.code === 11000) {
        // If two concurrent requests try to set default, the unique partial index fires
        err.message = "Only one default account book is allowed per user.";
        throw new AppError(err, 500);
      }
      throw new AppError(ErrorMsg.createDbError("account book").message, 500);
    }
  },
  setDefaultAccountBook: async (userId: string, accountBookId: string) => {
    try {
      const membership = await AccountBookMember.findOneAndUpdate(
        { userId, accountBookId },
        { isDefault: true },
        { new: true },
      );
      if (!membership) {
        throw new AppError(ErrorMsg.notFound("AccountBookMember").message, 404);
      }
      return membership;
    } catch (err: any) {
      logger.error(err);
      throw new AppError(
        ErrorMsg.updateDbError("default account book").message,
        500,
      );
    }
  },
  deleteAccountBook: async (userId: string, accountBookId: string) => {
    try {
      // 1) Verify the user is the owner of the account book
      const membership = await AccountBookMember.findOne({
        userId,
        accountBookId,
        role: "owner",
      });
      if (!membership) {
        throw new AppError(
          ErrorMsg.forbidden("Delete AccountBook").message,
          403,
        );
      }
      // 2) Check if one or many of users set it as default, if it is, prevent deletion
      const defaultCount = await AccountBookMember.countDocuments({
        accountBookId,
        isDefault: true,
      });
      if (defaultCount > 0) {
        throw new AppError(
          "Cannot delete an account book that is set as default by one or more users.",
          400,
        );
      }
      // 3) Delete all memberships related to the account book
      await AccountBookMember.deleteMany({ accountBookId });

      // 4) Delete the account book itself
      const deletedBook = await AccountBook.findByIdAndDelete(accountBookId);
      if (!deletedBook) {
        throw new AppError(ErrorMsg.notFound("AccountBook").message, 404);
      }

      return deletedBook;
    } catch (err: any) {
      logger.error(err);
      throw new AppError(err.message, err.statusCode || 500);
    }
  },
};
