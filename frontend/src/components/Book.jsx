import React from "react";
import "../styles/book.css";
import { StarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../features/cart/cartSlice";
import { updateBorrowing } from "../features/borrowings/borrowingsSlice";

const Book = ({ book, view, borrowing }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLocation = location.pathname;
  const cartItems = useSelector(selectCartItems);

  const onAddToCartClick = () => {
    dispatch(addToCart(book));
  };

  const onReturnClick = () => {
    dispatch(updateBorrowing(borrowing.id));
  };

  return (
    <>
      {view == "grid" ? (
        <div className="book-container">
          <img src={book.coverImageUrl} alt="Book Cover" />
          <Button
            type="primary"
            shape="circle"
            className="float-btn"
            icon={
              currentLocation == "/books" ? <ShoppingCartOutlined /> : <i className="fa-solid fa-rotate-left"></i>
            }
            onClick={currentLocation == "/books" ? onAddToCartClick : onReturnClick}
          />
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
                  To :{" "}
                  {borrowing.endDate
                    ? new Date(borrowing.endDate).toLocaleDateString()
                    : "_"}
                </small>
                <br />
              </>
            )}
            <Button
              className="return-btn"
              type="primary"
              icon={
                currentLocation == "/books" ? <ShoppingCartOutlined /> : <i className="fa-solid fa-rotate-left"></i>
              }
              onClick={currentLocation == "/books" ? onAddToCartClick : onReturnClick}
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
