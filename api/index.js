import express from "express";
import cors from "cors";
// New way of configuring dotenv package in the app
import "dotenv/config";
import path from "path";

// Old way of configuring dotenv
// import dotenv from "dotenv";
// dotenv.config();

// Importing Routes
import mocksRoute from "./routes/mocks.js";
import BookinginterviewRoute from "./routes/bookinginterview.js";
import UserRoute from "./routes/user.js";

import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

// Middleware from Clerk for protecting the routes
// import clerk, {
//   ClerkExpressRequireAuth,
//   ClerkExpressWithAuth,
// } from "@clerk/clerk-sdk-node";

// Inititalizing App
const app = express();

// // Connect to the database
// db.once("open", () => {
//   console.log("Connected to database");
// });

// // Handle database connection errors
// db.on("error", (err) => {
//   console.log("Database error:", err);
// });

//Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/mocks", ClerkExpressWithAuth(), mocksRoute);
app.use(
  "/api/bookinginterviews",
  ClerkExpressWithAuth(),
  BookinginterviewRoute
);
app.use("/api/users", ClerkExpressWithAuth(), UserRoute);

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

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === "production") {
  //*Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});