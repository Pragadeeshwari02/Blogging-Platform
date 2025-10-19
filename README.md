# 📝 Blogging Platform API

This is a RESTful API for a blogging platform built using **Node.js**, **Express**, and **MongoDB**. It allows users to register, log in, and perform CRUD operations on blog posts.

---

## 🚀 Features

- User Registration & Login (with JWT authentication)
- Create, Read, Update, Delete (CRUD) Blog Posts
- Protected Routes with Middleware
- MongoDB Database Integration

---

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (password hashing)
- dotenv (for environment variables)
- Postman (for API testing)

---

## 📁 Folder Structure

blogging-platform/
│
├── config/ # MongoDB connection file
├── controllers/ # Route controller functions
├── middleware/ # JWT auth middleware
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── .env # Environment variables
├── app.js # Main application entry point
├── package.json
└── README.md


---

## 📌 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get token |

### 📝 Blog Posts

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | `/api/posts`          | Get all blog posts      |
| GET    | `/api/posts/:id`      | Get a single post       |
| POST   | `/api/posts`          | Create a new post       |
| PUT    | `/api/posts/:id`      | Update an existing post |
| DELETE | `/api/posts/:id`      | Delete a post           |

> 🔒 Note: POST, PUT, DELETE routes are protected and require a valid JWT token in the `Authorization` header.

