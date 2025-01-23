import express from "express";
import { isAuth} from "../middlewares/isAuth.js";
import { followandUnfollowUser, myProfile, userFollowerandFollowingData, userProfile, updateProfile, updatePassword } from "../controllers/userController.js";
import uploadFile from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/me",isAuth,myProfile); 
userRouter.get("/:id", isAuth, userProfile);
userRouter.post("/:id", isAuth, updatePassword);
userRouter.put("/:id", isAuth, uploadFile, updateProfile);
userRouter.post("/follow/:id", isAuth, followandUnfollowUser);
userRouter.get("/followdata/:id", isAuth, userFollowerandFollowingData);

export default userRouter; 
