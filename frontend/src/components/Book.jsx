import React from "react";
import '../styles/book.css';
import { StarOutlined } from "@ant-design/icons";

const Book = ({ book }) => {
  return (
    <div className="book-container">
      <img src={ book.coverImageUrl } alt="Book Cover" />
      <small className="rating">
        <StarOutlined style={{color: '#FEB941'}} /> { book.averageRating } · { book.reviews.length } reviews
      </small>
      <p className="genre">
        { book.genres[0] }
      </p>
      <p className="title">{ book.title }</p>
      <small className="author">{ book.authors[0] }</small>
      <p className="price">${ book.price }</p>
    </div>
  );
};

export default Book;
