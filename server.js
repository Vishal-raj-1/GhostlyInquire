import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();

// Connections
mongoose.connect(process.env.MONGO_URL).then(() => console.log("connnected to the db"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use("/auth", authRouter);


app.listen(3000, () => console.log("Connected to the server"))