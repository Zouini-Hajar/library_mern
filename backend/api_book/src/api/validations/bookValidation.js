import * as yup from "yup";


export const addBookSchema = yup.object().shape({
  title: yup.string().required(),
  authors: yup.array().of(yup.string().required()).required(),
  isbn: yup.string().required(),
  description: yup.string(),
  publisher: yup.string(),
  publicationDate: yup.date(),
  genres: yup.array().of(yup.string()),
  language: yup.string(),
  numberOfPages: yup.number().positive().integer(),
  coverImageUrl: yup.string(),
  averageRating: yup.number().min(0).max(5),
  reviews: yup.array().of(
    yup.object().shape({
      user: yup.string(),
      rating: yup.number().min(0).max(5),
      comment: yup.string(),
    })
  ),
  price: yup.number().positive(),
  stock: yup.number().integer().min(0),
});

export const updateBookSchema = yup.object().shape({
  title: yup.string(),
  authors: yup.array().of(yup.string()),
  isbn: yup.string(),
  description: yup.string(),
  publisher: yup.string(),
  publicationDate: yup.date(),
  genres: yup.array().of(yup.string()),
  language: yup.string(),
  numberOfPages: yup.number().positive().integer(),
  coverImageUrl: yup.string().url(),
  averageRating: yup.number().min(0).max(5),
  reviews: yup.array().of(
    yup.object().shape({
      user: yup.string(),
      rating: yup.number().min(0).max(5),
      comment: yup.string(),
    })
  ),
  price: yup.number().positive(),
  stock: yup.number().integer().min(0),
});
