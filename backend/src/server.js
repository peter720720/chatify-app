import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pgPromise from 'pg-promise';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from "./lib/db.js";
import { v2 as cloudinary } from 'cloudinary';
import { ENV } from './lib/env.js';


// dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: ENV.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

const pgp = pgPromise({ noWarnings: true });
const __dirname = path.resolve();

const cn = {
    connectionString: ENV.DATABASE_URL,
    max: 1000
};
export const db = pgp(cn);

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME, 
  api_key: ENV.CLOUDINARY_API_KEY, 
  api_secret: ENV.CLOUDINARY_API_SECRET,
  secure: true
});


// mongoose.set('strictQuery', false);

// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("✅ MongoDB Connected successfully!"))
//   .catch((err) => {
//     console.error("❌ Database connection failed:", err.message);

//     process.exit(1); // Stop the server if the DB fails
//   });

const port = ENV.PORT || 5000;
const host = process.env.HOST;





app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Chatify API" });
});



app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes); 

// make ready for devlopment
if(ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html")); 
    })
}

app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);
    connectDB();
});


