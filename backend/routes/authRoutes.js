import express from "express" 
import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";
import uploadFile from "../middlewares/multer.js"
const authRouter = express.Router();

authRouter.post("/register", uploadFile, registerUser);
authRouter.post("/login",loginUser);
authRouter.get("/logout",logoutUser);

export default authRouter; 
