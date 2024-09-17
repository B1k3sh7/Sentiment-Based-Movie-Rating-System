import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors"; // optional
import movieRoute from "./routes/movieRouter.js";
import userRoute from "./routes/userRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());
// app.use(cors({
//   credentials:true,
//   origin : 'http://localhost:5173'

// }))
app.use(cookieParser());

// Router
app.use("/movies", movieRoute);
app.use("/users", userRoute);

app.use(async (req, res, next) => {
  next(createHttpError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB database connected");
  } catch (error) {
    console.log("MongDB database connection failed");
  }
};

// for testing (Basic route)
app.get("/", (req, res) => {
  res.send("API is working");
});

const startServer = async () => {
  await connect();
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
};

startServer();
