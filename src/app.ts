import express from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import connectDB from './utils/connection.js'
import { globalRouter } from "./routes";

// Esta es nuestra aplicación
export const app = express();

// Middlewares
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());

app.use("/", globalRouter);
