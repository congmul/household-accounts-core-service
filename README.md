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
- [User Flows](#user-flows)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

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

## Usage

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

## License