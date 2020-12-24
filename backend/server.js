import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import connectDB from "./db";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import bodyParser from "body-parser";
dotenv.config();


connectDB();

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);


app.listen(5000, () => {
  console.log("server started at 5000 port");
});
