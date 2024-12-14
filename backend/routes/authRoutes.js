import express from "express" 
import { registerUser } from "../controllers/authControllers.js";
import uploadFile from "../middlewares/multer.js"
const authRouter = express.Router();

authRouter.post("/register", uploadFile, registerUser);

export default authRouter; 
