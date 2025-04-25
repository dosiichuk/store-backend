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
Run one of the following scripts to set up the database, create tables, and pre-populate them with seed data:

- For the development database:
  ```bash
  npm run setup-db-dev
  ```

- For the test database:
  ```bash
  npm run setup-db-test
  ```

---

## 5. Launch the Server
Start the server by running the following command:

```bash
npm run watch
```

The server will launch on `http://localhost:3000`.

---

## Additional Notes
- Ensure Docker is installed and running on your machine before starting the project.
- The `setup-db-dev` and `setup-db-test` scripts in package.json handle database migrations and seed data population.
- The server uses `body-parser` to parse incoming JSON requests.

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
| `POST`    | `/api/auth`      | Authenticate a user and return a token   | Body: `{ "email": "string", "password": "string" }`                       |

---

## Database Schema

### **Users Table**
| Column Name   | Data Type        | Constraints                     |
|---------------|------------------|----------------------------------|
| `id`          | `SERIAL`         | Primary Key                     |
| `first_name`  | `VARCHAR(100)`   | NOT NULL                        |
| `last_name`   | `VARCHAR(100)`   | NOT NULL                        |
| `password`    | `VARCHAR(255)`   | NOT NULL (hashed password)      |

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