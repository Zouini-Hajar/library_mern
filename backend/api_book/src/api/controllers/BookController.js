import Book from "../models/Book.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length == 0) 
      res.status(404).json({ message: "No books found" });
    else 
      res.status(200).json(books);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getBook = async (req, res) => {
  try {
    if (!req.params.id) 
      return res.status(400).json({ message: "Id is required" });

    const book = await Book.findOne({ _id: req.params.id });
    if (!book)
      res.status(404).json({ message: `No book found with id ${req.params.id}` });
    else 
      res.status(200).json(book);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json({ message: "Book added successfully", book });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({ _id: req.body.id }, { $set: req.body });
    if (!book) 
      res.status(404).json({ message: `No book found matching id ${req.params.id}` });
    else
      res.status(200).json({ message: "Book updated successfully" });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteBook = async (req, res) => {
  try {
    if (!req.params.id) 
      return res.status(400).json({ message: "Id is required" });

    const book = await Book.findOneAndDelete({ _id: req.params.id });
    if (!book)
      res.status(404).json({ message: `No book found matching id ${req.params.id}` });
    else
      res.status(200).json({ message: "Book deleted successfully" });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};
