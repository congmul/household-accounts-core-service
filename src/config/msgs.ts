import AppError from "../utils/errorHandler";

export const TransactionMsg = {
  createDbError: { message: "Error during creating new transaction in DB." },
  getDbError: { message: "Error during reading transactions from DB." },
  updateDbError: { message: "Error during updating transaction from DB." },
  deleteDbError: { message: "Error during deleting transaction from DB." },
};

export const CategoryMgs = {
  createDbError: { message: "Error during creating new Category in DB." },
  getDbError: { message: "Error during reading Categorys from DB." },
  updateDbError: { message: "Error during updating Category from DB." },
  deleteDbError: { message: "Error during deleting Category from DB." },
};

export const BudgetMgs = {
  createDbError: { message: "Error during creating new Budget in DB." },
  getDbError: { message: "Error during reading Budgets from DB." },
  updateDbError: { message: "Error during updating Budget from DB." },
  deleteDbError: { message: "Error during deleting Budget from DB." },
};
export const SuccessMsg = {
  create: (name: string) => ({
    message: `New ${name} is created successfuly.`,
    statusCode: 201,
  }),
  update: (name: string) => ({
    message: `${name} is updated successfuly.`,
    statusCode: 200,
  }),
  delete: (name: string) => ({
    message: `${name} is deleted successfuly.`,
    statusCode: 200,
  }),
};

export const ErrorMsg = {
  notFound: (name: string) => ({
    message: `${name} not found.`,
    statusCode: 404,
  }),
  createDbError: (name: string) => ({
    message: `Error during creating new ${name} in DB.`,
    statusCode: 500,
  }),
  getDbError: (name: string) => ({
    message: `Error during reading ${name} from DB.`,
    statusCode: 500,
  }),
  updateDbError: (name: string) => ({
    message: `Error during updating ${name} from DB.`,
    statusCode: 500,
  }),
  deleteDbError: (name: string) => ({
    message: `Error during deleting ${name} from DB.`,
    statusCode: 500,
  }),
  exceptionError: { message: "Unknown has occurred.", statusCode: 500 },
};
