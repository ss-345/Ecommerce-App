# Ecommerce App (MERN Stack)

This is a full-stack e-commerce application built using the **MERN stack** (MongoDB, Express, React, Node.js). It features a fully functional front end for users and an admin dashboard for managing products, categories, and orders.

## Features

- User Authentication (Register, Login, Forgot Password)
- Product and Category Management
- Add to Cart functionality with local storage and backend cart persistence
- Payment Integration (Braintree)
- Order History and Admin Order Management
- Responsive Design using Bootstrap and React
- API Endpoints secured with JWT Authentication
- Admin Panel

## Technology Stack

### Backend:
- **Node.js** with **Express.js** as the server framework
- **MongoDB** as the database, with **Mongoose**
- **JWT** for user authentication
- **Braintree** for payment integration
- Other Dependencies: 
  - `dotenv`: For environment variable configuration
  - `cors`: Handling cross-origin resource sharing
  - `bcrypt`: For password hashing
  - `morgan`: For request logging
  - `slugify`: Generating slugs for products

### Frontend:
- **React** (with Create React App)
- **React Router** for routing
- **Ant Design (antd)** for UI components
- **Axios** for API requests
- **React Hot Toast** and **React Toastify** for user notifications
- **React Icons** for icons

## Installation and Setup

### Prerequisites:
Ensure you have **Node.js**, **npm**, and **MongoDB** installed on your system.

### Backend Setup:
### Navigate to the backend directory and install dependencies:
  
   **npm install**

   
### Create a .env file in the backend directory and add your environment variables (e.g., PORT, MONGO_URI, JWT_SECRET, BRAINTREE_MERCHANT_ID).

### Start the backend server:

**npm run server**

### Frontend Setup:

### Navigate to the frontend directory and install dependencies:

**npm install**
### Start the frontend development server:

**npm start**

### Running Full Application (Frontend + Backend):
### Run both the backend and frontend servers concurrently (as defined in the backend package.json):

**npm run dev**

### Scripts in package.json
### Backend Scripts:
**npm run start**: Runs the server using Node.

**npm run server**: Runs the server with nodemon for automatic restarts.

**npm run dev**: Runs the backend and frontend servers concurrently.

### Frontend Scripts:
**npm start**: Starts the React app in development mode.

**npm run build**: Builds the app for production.

**npm run test**: Launches the test runner in interactive mode.
