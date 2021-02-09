import express from "express";
import posts from '../data/posts.js';

const router = express.Router();


router.get("/posts", (req, res) => {
    res.status(201).json({ succes: true, data: posts });
})

export default router;