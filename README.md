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

### Upload Products from CSV

```bash
curl -X POST -F "file=@products.csv" http://localhost:8000/upload
```
##  Setup and Installation

### Running Manually

1. **Clone the repository**
   ```bash
   git clone https://github.com/laxmii2808/Streamoid_Assignment.git
   cd Streamoid2
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   npm install
   ```

1. **Build the Docker image**
   ```bash
   docker build -t streamoid-backend
   ```
2. **Run the container**
   ```bash
   docker run -p 8000:8000 streamoid-backend
   ```
### API Documentation
## 1. Upload Products from CSV
This request sends the products.csv file to the server to be parsed and stored.
- Endpoint: POST /upload
- Command:
```Bash
curl.exe -X POST -F "file=@products.csv" http://localhost:8000/upload
```
Sample Response:
```bash
{
  "stored": 20,
  "failed": []
}
```
## 2.List all the Products
This request retrieves a paginated list of all products from the database.
- Endpoint: GET /products
- Command:
```bash
curl "http://localhost:8000/products?page=1&limit=5"
```
Sample Response:
```bash
{
  "total": 20,
    "pages": 10,
    "currentPage": 1,
    "products": [
        {
            "sku": "TSHIRT-RED-001",
            "name": "Classic Cotton T-Shirt",
            "brand": "Stream Threads",
            "color": "Red",
            "size": "M",
            "mrp": 799,
            "price": 499,
            "quantity": 20
        },
        {
            "sku": "TSHIRT-BLK-002",
            "name": "Classic Cotton T-Shirt",
            "brand": "Stream Threads",
            "color": "Black",
            "size": "L",
            "mrp": 799,
            "price": 549,
            "quantity": 12
        }
    ]
}
```
## 3. Search and Filter Products
This request searches for products that match specific criteria, such as brand and price range.
- Endpoint: GET /products/search
- Command:
```bash
curl "http://localhost:8000/products/search?brand=BloomWear&maxPrice=2500"
```
Sample Response:
```bash
{
   [
       {
           "sku": "DRESS-PNK-S",
           "name": "Floral Summer Dress",
           "brand": "BloomWear",
           "color": "Pink",
           "size": "S",
           "mrp": 2499,
           "price": 2199,
           "quantity": 10
       },
       {
           "sku": "DRESS-YLW-M",
           "name": "Floral Summer Dress",
           "brand": "BloomWear",
           "color": "Yellow",
           "size": "M",
           "mrp": 2499,
           "price": 1999,
           "quantity": 7
       }
   ]
}
```
###Testing Instructions
The project includes a full suite of unit tests for validation and API logic. To run the tests, use the following command:

```Bash
npm test
```
