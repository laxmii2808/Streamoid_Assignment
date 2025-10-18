#  Streamoid – Product Catalog Management Backend

Welcome to **Streamoid**, a backend service built using **Node.js** and **Express.js** that enables online sellers to upload, manage, and search their product catalogs efficiently.  

This project demonstrates backend architecture design, CSV file handling, data validation, and API creation — all wrapped in a containerized, production-ready setup using **Docker**.

---

##  What is Streamoid?

**Streamoid** is a lightweight backend system where:
- Sellers can **upload product catalogs** via a CSV file.  
- Each record is **validated** before being stored in the database.  
- Users can **browse all products**, **filter by brand, color, or price**, and **paginate** results.  
- The system is **Dockerized** for consistent deployment.  

---

##  Project Goals

The main goals of this project are to:
- Build a **modular backend service** using Express.js.
- Learn **file upload and parsing** (CSV handling) in Node.js.
- Apply **data validation** rules using Joi.
- Implement **pagination and filtering** in REST APIs.
- Understand **containerization with Docker**.
- Follow **clean architecture principles** (controllers, routes, middlewares).

---

## Architecture Overview

This project follows a **modular Express structure** to maintain scalability and separation of concerns:

1. **Models (`/models`)**
   - `product.js`: Defines the schema for storing product details (SKU, name, brand, color, size, MRP, price, quantity).

2. **Controllers (`/controllers`)**
   - Contains all business logic for CSV upload, product listing, and search functionality.

3. **Routes (`/routes`)**
   - Organizes API routes (`productRoutes.js`) for handling all product-related endpoints.
     
4. **Config (`/config`)**
   - `database.js`: Configures Sequelize with SQLite database.

5. **Validators (`/validators`)**
   - `queryValidator.js`: Ensures correct query parameters for search filters.
   - `schema.js`

---

##  Tech Stack

### Backend
- **Node.js** + **Express.js** – Web framework and server logic.  
- **SQLite** (via Sequelize ORM) – Lightweight relational database.  
- **Multer + csv-parser** – CSV upload and parsing.  
- **Joi** – Input validation.  
- **Jest + Supertest** – Unit and API testing.  

### DevOps
- **Docker** – Containerization for easy setup and deployment.

---

## API Examples

###  Upload Products from CSV
```bash
curl -X POST -F "file=@products.csv" http://localhost:8000/upload


