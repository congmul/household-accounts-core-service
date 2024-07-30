export const TransactionMsg = {
  create: { message: "Transaction is created successfuly." },
  patch: { message: "Transaction is updated successfuly." },
  createDbError: { message: "Error during creating new transaction in DB." },
  notFound: { message: "The transaction is not found." },
  getDbError: { message: "Error during reading transactions from DB." },
  updateDbError: { message: "Error during updating transactions from DB." },
};

export const ErrorMsg = {
  exceptionError: { message: "Unknown has occurred." },
};
