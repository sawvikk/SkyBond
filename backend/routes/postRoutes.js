import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  commentonPost,
  deleteComment,
  deletePost,
  editCaption,
  getAllPosts,
  likeUnlikePost,
  newPost,
} from "../controllers/postControllers.js";
import uploadFile from "../middlewares/multer.js";

const PostRouter = express.Router();

PostRouter.post("/new", isAuth, uploadFile, newPost);
PostRouter.put("/:id", isAuth, editCaption);
PostRouter.delete("/:id", isAuth, deletePost);
PostRouter.get("/all", isAuth, getAllPosts);
PostRouter.post("/like/:id", isAuth, likeUnlikePost);
PostRouter.post("/comment/:id", isAuth, commentonPost);
PostRouter.delete("/comment/:id", isAuth, deleteComment);

export default PostRouter;