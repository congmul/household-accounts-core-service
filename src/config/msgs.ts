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

export const CategoryMgs = {
  create: { message: "Category is created successfuly." },
  patch: { message: "Category is updated successfuly." },
  delete: { message: "Category is deleted successfuly." },
  createDbError: { message: "Error during creating new Category in DB." },
  notFound: { message: "The Category is not found." },
  getDbError: { message: "Error during reading Categorys from DB." },
  updateDbError: { message: "Error during updating Category from DB." },
  deleteDbError: { message: "Error during deleting Category from DB." },
};

export const ErrorMsg = {
  exceptionError: { message: "Unknown has occurred." },
};
