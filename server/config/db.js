import mongoose from "mongoose";
import "dotenv/config";

// Getting mongodb connection URL from env. variable
const connectionUrl = process.env.MONGO;

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection established!");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

export default mongoose.connection;
