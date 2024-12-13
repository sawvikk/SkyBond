import express from "express";
import dotenv from "dotenv";
dotenv.config(); 
const app = express(); 

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


app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
});