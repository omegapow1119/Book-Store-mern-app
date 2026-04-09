const cloudinary = require("../stats/cloudinary");
const Book = require("./book.model");
const axios = require("axios");

const postABook = async (req, res) => {
    try {
        const { coverImage, ...rest } = req.body;

        const upload = await cloudinary.uploader.upload(coverImage);

        const newBook = await Book({ ...rest, coverImage: upload.secure_url });
        await newBook.save(); //to save in database
        res.status(200).send({ message: "Book posted successfully", book: newBook })
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({ message: "Failed to create book" })
    }
}

// get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)

    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" })
    }
}

const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({ message: "Book not Found!" })
        }
        res.status(200).send(book)

    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({ message: "Failed to fetch book" })
    }

}

// update book data
const UpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).send({ message: "Book is not Found!" })
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({ message: "Failed to update a book" })
    }
}

const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({ message: "Book is not Found!" })
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({ message: "Failed to delete a book" })
    }
};

const getRecommendations = async (req, res) => {
    try {
        const { email } = req.query;
        let url = 'http://127.0.0.1:8000/recommend';
        if (email && email !== 'undefined' && email !== 'null') {
            url += `?email=${encodeURIComponent(email)}`;
        }
        const response = await axios.get(url);
        res.status(200).send(response.data);
    } catch (error) {
        console.error("Error fetching recommendations", error);
        res.status(500).send({ message: "Failed to fetch recommendations" })
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook,
    getRecommendations
}