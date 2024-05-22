import React from "react";

const CartItem = ({ book }) => {
    return (
        <div className="cart-item">
            <div>
              <img src={book.coverImageUrl} alt="Book Cover" />  
            </div>
            
            <div>
                <p className="title">{book.title}</p>
                <small className="author">{book.authors[0]}</small>
            </div>
        </div>
    );
};

export default CartItem;
