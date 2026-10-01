const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Book = require("./models/Book");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/", (req, res) => {
    res.send("Library Book Management API is running");
});

app.post("/api/books", async (req, res) => {
    try {
        const { title, author, isbn, category, publicationYear } = req.body;

        if (!title || !author || !isbn || !category || !publicationYear) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newBook = new Book({
            title,
            author,
            isbn,
            category,
            publicationYear
        });

        const savedBook = await newBook.save();

        res.status(201).json(savedBook);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});