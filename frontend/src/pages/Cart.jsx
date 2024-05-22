import React from "react";
import { useSelector } from "react-redux";
import CartDetails from "../components/CartDetails";
import CheckOut from "../components/CheckOut";

const Cart = () => {
    const books = useSelector(state=> state.cart.data);
    const prices =books.map(book => book.price);
    return(
        <div>
            <CartDetails books={books}/>
            <CheckOut prices={prices}/>
        </div>
    )

};

export default Cart;
