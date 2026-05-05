# Full Stack Authentication App

This repository contains the Level 2 evolution of the CodVeda User Manager application. The project has been fully migrated from vanilla JavaScript and MySQL to a modern **React (Vite)** frontend and a **MongoDB (Mongoose)** backend, featuring complete JSON Web Token (JWT) authentication and Role-Based Access Control (RBAC).

## Features

- **React Single Page Application**: Fast, component-based frontend built with Vite.
- **MongoDB Database Integration**: Strict data models and validation using Mongoose.
- **JWT Authentication**: Secure user login and signup workflows with tokens stored in `localStorage`.
- **Role-Based Authorization**: Distinct `user` and `admin` roles. Only admins can delete accounts.
- **Secure Passwords**: All passwords are cryptographically hashed using `bcryptjs` before hitting the database.
- **Premium UI**: Glassmorphism aesthetic preserved and converted into reusable React components (`Login`, `Signup`, `Dashboard`).

## Technology Stack

### Frontend
- **React.js** (via Vite)
- **React Router** for protected client-side navigation
- **Lucide React** for modern SVG iconography
- **Vanilla CSS** with CSS Variables and Animations

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose ORM**
- **jsonwebtoken (JWT)** for session handling
- **bcryptjs** for password hashing

---

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (v14 or higher) installed.
- **MongoDB** daemon running locally on default port `27017` (or provide an Atlas URI).

---

## Setup Instructions

### 1. Backend Setup

1. Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install the necessary Node dependencies:
   ```bash
   npm install
   ```
3. Configure your Environment Variables. The `.env` file should look like this:
   ```env
   MONGO_URI=mongodb://localhost:27017/code_veda
   PORT=3000
   JWT_SECRET=your_super_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   # or, for development:
   nodemon index.js
   ```

### 2. Frontend Setup

1. Open a *new* terminal window and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install the React dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided (usually `http://localhost:5173`).

---

## Testing the Application

1. Upon opening the frontend, you will be redirected to `/login` because you are unauthenticated.
2. Click **Sign Up** to create an account. 
   - *Note: The very first user registered in an empty database is automatically granted the `admin` role. All subsequent signups become standard `user` roles.*
3. Once registered and logged in, you will be redirected to the secure **Dashboard**.
4. Test Mongoose validation by submitting badly formatted data.
5. If you are logged in as a standard `user`, the "Delete" buttons on user cards will be hidden. If you are an `admin`, you can delete anyone (except yourself).

---

## API Endpoints Reference

### Authentication
- `POST /auth/signup`: Create a new user account. Returns a JWT.
- `POST /auth/login`: Authenticate existing user. Returns a JWT.

### Protected CRUD Operations (Requires `Authorization: Bearer <token>`)
- `GET /users`: Retrieve all registered users.
- `GET /users/:id`: Retrieve a specific user.
- `POST /users`: Manually add a new user from the dashboard (requires Admin).
- `PUT /users/:id`: Update user details.
- `DELETE /users/:id`: Remove a user from the database (strictly requires Admin role).