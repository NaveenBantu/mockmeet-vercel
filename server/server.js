import express from "express";
import cors from "cors";
// New way of configuring dotenv package in the app
import "dotenv/config";

// Old way of configuring dotenv
// import dotenv from "dotenv";
// dotenv.config();

// Importing Routes
import mocksRoute from "./routes/mocks.js";
import interviewerRoute from "./routes/interviewers.js";

// Importing database connection function
import db from "./config/db.js";

// Inititalizing App
const app = express();

// Connect to the database
db.once("open", () => {
  console.log("Connected to database");
});

// Handle database connection errors
db.on("error", (err) => {
  console.log("Database error:", err);
});

//Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/mocks", mocksRoute);
app.use("/api/interviewers", interviewerRoute);

// Error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
