import { Schema, model } from "mongoose";

const BookSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
  publisher: String,
  publicationDate: Date,
  genres: [String],
  language: String,
  numberOfPages: Number,
  coverImageUrl: String,
  averageRating: Number,
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
    },
  ],
  price: Number,
  stock: Number
});

export default model("book", BookSchema);
