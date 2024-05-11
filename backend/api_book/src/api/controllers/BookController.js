import Book from "../models/Book.js";

export const getAllBooks = (req, res) => {
  Book.find()
    .then((books) => {
      if (books.length == 0)
        res.status(404).json({ message: "No books found" });
      else res.status(200).json(books);
    })
    .catch((err) => res.sendStatus(500));
};

export const getBook = (req, res) => {
  if (!req.params.id) res.status(400).json({ message: "Id is required" });

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book)
        res.status(404).json({ message: `No book found with id ${req.params.id}` });
      else res.status(200).json(book);
    })
    .catch((err) => res.sendStatus(500));
};

export const addBook = (req, res) => {
  Book.create(req.body)
    .then((book) => res.status(200).json({ message: "Book added successfully", book }))
    .catch((err) => res.sendStatus(500));
};

export const updateBook = (req, res) => {
  Book.findOneAndUpdate({ _id: req.body.id }, { $set: req.body })
    .then((book) => {
      if (!book) 
        res.status(404).json({ message: `No book found matching id ${req.params.id}` });
      else
        res.status(200).json({ message: "Book updated successfully" });
    })
    .catch((err) => res.sendStatus(500));
};

export const deleteBook = (req, res) => {
  if (!req.params.id) res.status(400).json({ message: "Id is required" });

  Book.findOneAndDelete({ _id: req.params.id })
    .then((book) => {
      if (!book)
        res.status(404).json({ message: `No book found matching id ${req.params.id}` });
      else
        res.status(200).json({ message: "Book deleted successfully" });
    })
    .catch((err) => res.sendStatus(500));
};
