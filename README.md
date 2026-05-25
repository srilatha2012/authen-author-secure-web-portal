# Secure Web Portal
A secure web portal built with Node.js, Express, MongoDB, and JWT Authentication.
This application allows users to register, log in, and manage their own protected resources securely.

## Features
- User registration
- User login with JWT authentication
- Protected routes using authentication middleware
- Authorization so users can access only their own data
- Create, read, update, and delete bookmarks
- MongoDB database connection using Mongoose
- Environment variables with dotenv

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token(JWT)
- dotenv

## Install dependencies
npm install

## Create .env file and add:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## API Endpoints
POST /api/users/register ->Register user
POST /api/users/login -> Login user

### Bookmark(Protected)
 GET /api/bookmarks
 GET /api/bookmarks/:id
 POST /api/bookmarks
 PUT /api/bookmarks/:id
 DELETE /api/bookmarks/:id

## Reflection
The most challenging part of this project was implementing authentication and authorization correctly for protected routes
