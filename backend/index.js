import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cloudinary from 'cloudinary'
import cookieParser from "cookie-parser";
import { Chat } from "./models/ChatModel.js";
import { User } from "./models/userModel.js";
import { isAuth } from "./middlewares/isAuth.js";
dotenv.config(); 
cloudinary.v2.config({
    cloud_name:process.env.Cloudinary_Cloud_Name,
    api_key:process.env.Cloudinary_API,
    api_secret:process.env.Cloudinary_Secret
});
const app = express(); 

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT; 

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SkyBond</title>
        </head>
        <body>
            <h1>Welcome to the SkyBond Server</h1>
        </body>
        </html>
    `);
});

app.get("/api/messages/chats", isAuth, async (req, res) => {
    try {
      const chats = await Chat.find({
        users: req.user._id,
      }).populate({
        path: "users",
        select: "name profilePic",
      });
  
      chats.forEach((e) => {
        e.users = e.users.filter(
          (user) => user._id.toString() !== req.user._id.toString()
        );
      });
  
      res.json(chats);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// to get all users
app.get("/api/user/all", isAuth, async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
      _id: { $ne: req.user._id },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


//importing routes
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

//using routes
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/post",postRouter);
app.use("/api/messages",messageRouter);

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
}); 