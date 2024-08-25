# Household Accounts Core service
This repository contains the backend service built with Express and Typescript.

[API Specification](https://household-accounts-core-service.azurewebsites.net/api-spec)

## Overview
The main goal of the Household Accounts Core Service is to handle all data operations for creating, reading, updating, and deleting records. This service is responsible for CRUD operations on Transactions, Categories, and Budgets.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:congmul/household-accounts-core-service.git
   cd household-accounts-core-service
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Set up environment variables:

    Create a .env file in the root directory and add the values (Please check env.example file)

4. Start the application:
    ```sh
    npm run dev
    ```

## Configuration
It needs to set env like the following examples.
```
PORT=3001
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=household-accounts-core-service
USER_SERVICE_URL=http://localhost:3002
```

## Usage
To run the app
```bash
npm start
```
This will start the application on 'http://localhost:3002'

## Endpoints
[API Specification](https://household-accounts-core-service.azurewebsites.net/api-spec)

## Project Structure
```bash
household-accounts-core-service/
  ├── src/ 
  │ ├── config/
  │ │    ├── db.ts
  │ │    ├── config.ts
  │ │    └── msgs.ts
  │ ├── controllers/
  │ │    ├── budget.controller.ts
  │ │    ├── category.controller.ts
  │ │    ├── index.ts  
  │ │    └── transaction.controller.ts
  │ ├── models/
  │ │    ├── assets.ts  
  │ │    ├── budget.ts  
  │ │    ├── category.ts  
  │ │    ├── index.ts  
  │ │    └── transaction.ts
  │ ├── routes/
  │ │    ├── budget.ts
  │ │    ├── category.ts
  │ │    ├── index.ts
  │ │    ├── swagger.ts
  │ │    └── transaction.ts
  │ ├── services/
  │ │    ├── budget.service.ts
  │ │    ├── category.service.ts
  │ │    ├── index.ts
  │ │    ├── transaction.service.ts
  │ │    └── user.service.ts
  │ ├── types/
  │ │    ├── assets.ts
  │ │    ├── budget.ts
  │ │    ├── category.ts
  │ │    ├── index.ts
  │ │    └── transaction.ts
  │ ├── utils/
  │ │    ├── errorHandler.ts
  │ │    ├── logger.ts
  │ │    └── pick.ts
  │ ├── api-spec.json 
  │ └── app.ts
  ├── package.json
  └── .env
```

## Contributing
1. Fort the repository.
2. Create a new branch: `git checkout -b feature/your-feautre-name` on `development` branch.
3. Whatever work you do, after it has been tested locally by hand and unit/integration tests, you will bump the major, minor, or patch versions of package.json file based on the scope of work completed. Rule of thumb is:
 - Breaking changes = bump major version
 - Additional feature(s) with no breaking changes = bump minor version
 - Chore or bug fix = bump patch version
4. Make your changes an commit them: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Open a pull request.