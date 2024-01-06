import { Router } from 'express'
import { handleUserRegister, handleUserLogin} from '../controller/auth.js';

const authRouter = Router();

authRouter.post("/register", handleUserRegister);
authRouter.post("/login", handleUserLogin);

export default authRouter;