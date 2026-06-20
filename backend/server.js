
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookStoreDB", {
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    category: String
});

// Model
const Book = mongoose.model("Book", bookSchema);

// POST API → Add Book
app.post("/books", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();

        res.json({
            message: "Book Added Successfully",
            data: newBook
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET API → Get All Books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});