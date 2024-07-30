export const TransactionMsg = {
  create: { message: "Transaction is created successfuly." },
  patch: { message: "Transaction is updated successfuly." },
  delete: { message: "Transaction is deleted successfuly." },
  createDbError: { message: "Error during creating new transaction in DB." },
  notFound: { message: "The transaction is not found." },
  getDbError: { message: "Error during reading transactions from DB." },
  updateDbError: { message: "Error during updating transaction from DB." },
  deleteDbError: { message: "Error during deleting transaction from DB." },
};

export const ErrorMsg = {
  exceptionError: { message: "Unknown has occurred." },
};
