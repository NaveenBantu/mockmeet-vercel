import mongoose from "mongoose";

// Connection URL
const url = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB", mongoose.connection.host);
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

export default mongoose.connection;
