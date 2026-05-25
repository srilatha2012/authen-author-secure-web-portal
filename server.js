// Load environment variables
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Import dependencies
const express = require("express");
const passport = require("passport");

// Import MongoDB connection
const db = require("./config/connection");

// Load passport configuration
require("./config/passport");

// Import API routes
const routes = require("./routes/api");

// Create Express app
const app = express();

// Load PORT from .env
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport
app.use(passport.initialize());

// API routes
app.use("/api", routes);

// Connect to MongoDB and start server
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });
});