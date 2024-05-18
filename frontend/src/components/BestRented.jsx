import React from "react";
import { StarFilled } from "@ant-design/icons";
import "../styles/bestrented.css";

const BestRented = ({ book }) => {
  return (
    <div className="bestrented-container">
      <div>
        <img src={book.coverImageUrl} alt="Book Cover" />
      </div>

      <div className="book">
        <div className="badges">
          <p className="genre">{book.genres[0]}</p>
          <div className="reviews-container">
            <div className="reviews">
              <span>
                <StarFilled />
              </span>
              <span>{book.averageRating}</span>
            </div>
          </div>
        </div>
    <div>
       <p className="title">{book.title}</p>
        <small className="author">{book.authors[0]}</small>
        <p className="price">${book.price}</p> 
    </div>
        
      </div>
    </div>
  );
};

export default BestRented;
