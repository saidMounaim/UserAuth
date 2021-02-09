import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

// ROUTES
import AuthRoutes from './routes/AuthRoutes.js';
import PostRoutes from './routes/PostRoutes.js';

//MIDDLEWARE AUTH
import verifyToken from './middleware/Auth.js';

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan());


app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Hello From Server" });
})

// ROUTES AUTH
app.use("/api", AuthRoutes);

//ROUTES POSTS PRIVATE
app.use('/api', verifyToken, PostRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on ${PORT} Port`));