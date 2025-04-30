# Shop API

A RESTful API for managing a shop, built with Node.js, Express, PostgreSQL, and TypeScript.

---

## Features

- User authentication with JWT and password hashing using bcrypt.
- CRUD operations for products, users, and orders.
- Secure routes with authentication middleware.
- PostgreSQL database integration with Docker support.
---

---

# Project Setup and Launch Instructions

Follow the steps below to set up and launch the project:

---

## 1. Install Node Modules
Run the following command to install all required dependencies:

```bash
npm install
```

---

## 2. Add .env File
Create a .env file in the root directory of the project and paste the required environment variables into it. The .env file should include configuration details such as database credentials, JWT secrets, and other necessary settings.

Paste this into your .env file:
```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=password123
POSTGRES_DB_DEV=shop_dev
POSTGRES_DB_TEST=shop_test
POSTGRES_PORT=5432
POSTGRES_HOST=localhost
ENV=development

JWT_SECRET=secret
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=10  
```
---

## 3. Run Docker Container
Start the PostgreSQL database using Docker by running the following command:

```bash
docker-compose up
```

### Note:
- When Docker starts, it runs the init.sql script, which creates two databases: `dev` (for development) and `test` (for testing).

---

## 4. Set Up the Database
Run the following scripts to set up the dev database, create tables, and pre-populate them with seed data:

- For the development database:
  ```bash
  npm run setup-db-dev
  ```
There is no need to manually setup the test database, it will be set up when you run the test script.

## 5. Launch the Server
Start the server by running the following command:

```bash
npm run watch
```

The server will launch on `http://localhost:3000`.

---
The map of API endpoints is preseneted in a table below.

## 6. Testing the source code
The code contains tests for API endpoints and for models. In order to run tests, run the script:
```bash
npm run test
```
The script will pre-populate the test database with seed data, which you can find in the src/seeds/seed.ts script.
The test data contains 2 users, 3 products and 3 orders.
Once you have run the tests, make sure to clean the test database manually by running:
```bash
npm run clean-db-test
```
If you don't clean the test database, you risk data duplication upon the next test run.

## 7. Getting jwt token to be able to access protected routes
In order to get a token, you need to first visit the /api/auth route and provide valid credentials.
You can use data of one of test users:
{
  "firstName": "Alice",
  "lastName": "Anderson",
  "password": "password123"
}
In response, you will get a token, which you should add to subsequent requests to protected routes in Authorization headers.

## Additional Notes
- Ensure Docker is installed and running on your machine before starting the project.
---


## API Endpoints

### **Users**
| HTTP Verb | Endpoint         | Description                              | Parameters                                                                 |
|-----------|------------------|------------------------------------------|----------------------------------------------------------------------------|
| `GET`     | `/api/users`     | Get all users (requires token)           | Headers: `Authorization: Bearer <token>`                                  |
| `GET`     | `/api/users/:id` | Get a specific user by ID (requires token) | Headers: `Authorization: Bearer <token>`                                  |
| `POST`    | `/api/users`     | Create a new user (requires token)       | Body: `{ "firstName": "string", "lastName": "string", "password": "string" }` |

---

### **Products**
| HTTP Verb | Endpoint                     | Description                              | Parameters                                                                 |
|-----------|------------------------------|------------------------------------------|----------------------------------------------------------------------------|
| `GET`     | `/api/products`              | Get all products                         | None                                                                      |
| `GET`     | `/api/products/:id`          | Get a specific product by ID             | None                                                                      |
| `GET`     | `/api/products/category/:category` | Get products by category                 | URL Parameter: `category`                                                 |
| `GET`     | `/api/products/top-five`     | Get the top five most popular products   | None                                                                      |
| `POST`    | `/api/products`              | Create a new product (requires token)    | Headers: `Authorization: Bearer <token>`<br>Body: `{ "name": "string", "price": "number", "category": "string" }` |

---

### **Orders**
| HTTP Verb | Endpoint              | Description                              | Parameters                                                                 |
|-----------|-----------------------|------------------------------------------|----------------------------------------------------------------------------|
| `GET`     | `/api/orders`         | Get all orders (requires token)          | Headers: `Authorization: Bearer <token>`                                  |
| `GET`     | `/api/orders/:id`     | Get orders by user ID (requires token)   | Headers: `Authorization: Bearer <token>`<br>URL Parameter: `id`           |

---

### **Authentication**
| HTTP Verb | Endpoint         | Description                              | Parameters                                                                 |
|-----------|------------------|------------------------------------------|----------------------------------------------------------------------------|
| `POST`    | `/api/auth`      | Authenticate a user and return a token   | Body: `{ "firstName": "string", "lastName": "string", "password": "string" }`                       |

---

## Database Schema

### **Users Table**
| Column Name   | Data Type        | Constraints                     |
|---------------|------------------|----------------------------------|
| `id`          | `SERIAL`         | Primary Key                     |
| `first_name`  | `VARCHAR(100)`   | NOT NULL                        |
| `last_name`   | `VARCHAR(100)`   | NOT NULL                        |
| `password_hash`    | `VARCHAR(255)`   | NOT NULL (hashed password)      |

---

### **Products Table**
| Column Name   | Data Type        | Constraints                     |
|---------------|------------------|----------------------------------|
| `id`          | `SERIAL`         | Primary Key                     |
| `name`        | `VARCHAR(255)`   | NOT NULL                        |
| `price`       | `DECIMAL(10, 2)` | NOT NULL                        |
| `category`    | `VARCHAR(100)`   | NULLABLE                        |

---

### **Orders Table**
| Column Name   | Data Type        | Constraints                     |
|---------------|------------------|----------------------------------|
| `id`          | `SERIAL`         | Primary Key                     |
| `user_id`     | `INTEGER`        | Foreign Key -> `users(id)`      |
| `status`      | `order_status`   | NOT NULL, ENUM ('active', 'complete') |

---

### **Order Items Table**
| Column Name   | Data Type        | Constraints                     |
|---------------|------------------|----------------------------------|
| `id`          | `SERIAL`         | Primary Key                     |
| `order_id`    | `INTEGER`        | Foreign Key -> `orders(id)`     |
| `product_id`  | `INTEGER`        | Foreign Key -> `products(id)`   |
| `quantity`    | `INTEGER`        | NOT NULL, CHECK (quantity > 0)  |

---

### **Enum Types**
| Enum Name      | Values                     |
|----------------|----------------------------|
| `order_status` | `'active', 'complete'`     |

---