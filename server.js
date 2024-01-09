import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import appRouter from "./routes/app.js";
import AuthMiddleware from "./middlewares/authMiddleware.js";
import { handlePostMessages } from "./controller/messages.js";
import cors from "cors";

dotenv.config();
const app = express();

// Connections
mongoose.connect(process.env.MONGO_URL).then(() => console.log("connnected to the db"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin:"*",
  credentials: true,
}));

// Routes
app.use("/auth", authRouter);
app.use("/account", AuthMiddleware, appRouter);

app.post("/:id", handlePostMessages);


app.listen(3000, () => console.log("Connected to the server"));