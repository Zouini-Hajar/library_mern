import React from "react";
import "../styles/book.css";
import { StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useLocation } from "react-router-dom";

const Book = ({ book, view, borrowing }) => {
  const location = useLocation();

  return (
    <>
      {view == "grid" ? (
        <div className="book-container">
          <img src={book.coverImageUrl} alt="Book Cover" />
          <small className="rating">
            <StarOutlined style={{ color: "#FEB941" }} /> {book.averageRating} ·{" "}
            {book.reviews.length} reviews
          </small>
          <p className="genre">{book.genres[0]}</p>
          <p className="title">{book.title}</p>
          <small className="author">{book.authors[0]}</small>
          <p className="price">${book.price}</p>
        </div>
      ) : (
        <div className="book-list-item">
          <div className="img-container">
            <img src={book.coverImageUrl} alt="Book Cover" />
          </div>
          <div className="book-details">
            <div>
              {book.genres.map((genre) => (
                <span className="genre-tag">{genre}</span>
              ))}
            </div>
            <p className="title">{book.title}</p>
            <small className="author">{book.authors[0]}</small>
            <span className="dot"> · </span>
            <span className="rating">
              <i class="fa-solid fa-star" style={{ color: "#FFC100" }}></i>{" "}
              {book.averageRating}{" "}
            </span>
            <small> ({book.reviews.length} reviews)</small>
            <p className="book-description">{book.description}</p>
          </div>
          <div className="actions">
            <p className="price">${book.price}</p>
            {location.pathname == "/profile" && (
              <>
                <small>
                  From : {new Date(borrowing.startDate).toLocaleDateString()}
                </small>
                <br />
                <small>
                  To : {borrowing.endDate ? new Date(borrowing.endDate).toLocaleDateString(): "_"}
                </small>
                <br />
              </>
            )}
            <Button
              className="return-btn"
              type="primary"
            >
              {location.pathname == "/profile" ? "Return" : "Add To Cart"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
