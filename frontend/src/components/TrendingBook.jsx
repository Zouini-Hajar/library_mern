import React from "react";
import { StarFilled } from "@ant-design/icons";

const TrendingBook = ({ book }) => {
    return (
        <div className="trendingbook-container">
            <div className="reviews-container">
                <div className="reviews">
                    <span><StarFilled /></span>
                    <span>{book.averageRating}</span>
                </div>
            </div>
            <img src={book.coverImageUrl} alt="Book Cover" />
            <p className="genre">
                {book.genres[0]}
            </p>
            <p className="title">{book.title}</p>
            <small className="author">{book.authors[0]}</small>
            <p className="price">${book.price}</p>
        </div>
    );
};

export default TrendingBook;
