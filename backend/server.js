import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
const app = express();

//PORT
dotenv.config();
const PORT = process.env.PORT || 7000;

//Mongoose connection
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log(`Server listening on port ${PORT}`);
});
