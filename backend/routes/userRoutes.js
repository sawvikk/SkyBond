import express from "express";
import { isAuth} from "../middlewares/isAuth.js";
import { myProfile, userProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/me",isAuth,myProfile);
userRouter.get("/:id", isAuth, userProfile);
// router.post("/:id", isAuth, updatePassword);
// router.put("/:id", isAuth, uploadFile, updateProfile);
// router.post("/follow/:id", isAuth, followandUnfollowUser);
// router.get("/followdata/:id", isAuth, userFollowerandFollowingData);

export default userRouter; 
