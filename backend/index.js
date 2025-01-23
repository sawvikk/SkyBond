import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cloudinary from 'cloudinary'
import cookieParser from "cookie-parser";
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

//importing routes
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";

//using routes
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/post",postRouter);

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
}); 