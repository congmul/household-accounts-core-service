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
