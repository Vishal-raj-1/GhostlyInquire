import { Router } from "express";
import { handleUserMessages } from "../controller/app.js"
const appRouter = Router();

appRouter.get("/messages", handleUserMessages);

export default appRouter;