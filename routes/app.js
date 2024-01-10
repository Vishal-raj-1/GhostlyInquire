import { Router } from "express";
import { handleGetUserDetails, handleUserMessages } from "../controller/app.js";
const appRouter = Router();

appRouter.get("/messages", handleUserMessages);

appRouter.get("/user-details", handleGetUserDetails);

export default appRouter;