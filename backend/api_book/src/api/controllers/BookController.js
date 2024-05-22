import { channel } from "../../config/RabbitMQConfig.js";
import Book from "../models/Book.js";
import { configDotenv } from 'dotenv';

configDotenv();

const MAILING_QUEUE = process.env.MAILING_QUEUE;

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
    console.log(req.body)
    const book = await Book.create(req.body);

    // Send notification to clients that a new book was added
    const data = ['New Book Added', {
      title: book.title,
      authors: book.authors,
      description: book.description,
      genres: book.genres,
      coverImageUrl: book.coverImageUrl
    }];
    channel.sendToQueue(MAILING_QUEUE, Buffer.from(JSON.stringify(data)));

    res.status(200).json({ message: "Book added successfully", book });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updateBook = async (req, res) => {
  try {
    console.log(req.body)
    const book = await Book.findOneAndUpdate({ _id: req.body._id }, { $set: req.body });
    if (!book) 
      res.status(404).json({ message: `No book found matching id ${req.body._id}` });
    else {
      // Send notification to admin to restock
      if (req.body.stock == 0) {
        const data = ['Book Out Of Stock', {
          id: book._id,
          title: book.title,
        }];
        channel.sendToQueue(MAILING_QUEUE, Buffer.from(JSON.stringify(data)));
      }

      // Send notification to client that book is back on stock
      if (req.body.stock && req.body.stock != 0 && book.stock == 0) {
        const data = ['Book Back on Stock', {
          id: book._id,
          title: book.title,
        }];
        channel.sendToQueue(MAILING_QUEUE, Buffer.from(JSON.stringify(data)));
      }
      res.status(200).json({ message: "Book updated successfully" });
    }
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
