import mongoose from "mongoose";

const connectionUrl = process.env.MONGO;

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection established!");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

export default mongoose.connection;
