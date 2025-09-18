// To run this script, use the command: npm run db-migrate

import dbLoader from "../config/db";
import { Budget, Category, Transaction } from "../models";

dbLoader();

migrate();

async function migrate() {
  try {
    // Add accountBookId field to all existing Budget documents
    await Category.updateMany(
      { accountBookId: { $exists: false } }, // Only update documents without accountBookId
      { $set: { accountBookId: null } }, // Set a default value, e.g., null or a specific ObjectId
    );
    // Add accountBookId value by userId
    await Category.updateMany(
      { userId: "66b023c3c49d3f879727a657" }, // Only update documents without accountBookId
      { $set: { accountBookId: "68c9a3fccae107fdda0d552e" } }, // Set a default value, e.g., null or a specific ObjectId
    );

    await Budget.updateMany(
      { accountBookId: { $exists: false } }, // Only update documents without accountBookId
      { $set: { accountBookId: null } }, // Set a default value, e.g., null or a specific ObjectId
    );
    await Budget.updateMany(
      { userId: "66b023c3c49d3f879727a657" }, // Only update documents without accountBookId
      { $set: { accountBookId: "68c9a3fccae107fdda0d552e" } }, // Set a default value, e.g., null or a specific ObjectId
    );

    await Transaction.updateMany(
      { accountBookId: { $exists: false } }, // Only update documents without accountBookId
      { $set: { accountBookId: null } }, // Set a default value, e.g., null or a specific ObjectId
    );
    await Transaction.updateMany(
      { userId: "66b023c3c49d3f879727a657" }, // Only update documents without accountBookId
      { $set: { accountBookId: "68c9a3fccae107fdda0d552e" } }, // Set a default value, e.g., null or a specific ObjectId
    );
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    // Need to exit the process manually since Mongoose keeps the connection open
    setTimeout(() => {
      process.exit(0);
    }, 3000);
  }
}
