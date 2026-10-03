
import express from "express";
import dotenv from  "dotenv";
import pool from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js"

dotenv.config()

const app = express();


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);


const port = process.env.PORT 


app.use("/api/auth", authRoutes)


// testing postgres connection

app.get("/", async (req, res) => {
    try {
        console.log("Testing database connection...");
        const result = await pool.query("SELECT current_database() AS current_database");
        res.send(`The database name is: ${result.rows[0].current_database}`);
    } catch (error) {
        console.error("Database connection error:", error.message);
        res.status(500).json({
            message: "Database connection failed",
            error: error.message,
        });
    }
});



//  server running
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});