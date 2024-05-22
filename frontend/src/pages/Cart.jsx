import React , { useEffect }from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { addBorrowing } from '../features/borrowings/borrowingsSlice';
import CartDetails from "../components/CartDetails";
import CheckOut from "../components/CheckOut";
import { selectUser } from "../features/user/userSlice";
import { removeFromCart, resetCart } from "../features/cart/cartSlice";

const Cart = () => {
    const books = useSelector(state=> state.cart.data);
    const prices = books.map(book => book.price);
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        books.map(book => {
            dispatch(addBorrowing({ clientId: user._id, bookId: book._id }));
        })
        dispatch(resetCart()); 
    }

    const handleCancel = (id) => {
        dispatch(removeFromCart({id}));
    }

    return(
        <div>
            <CartDetails books={books} handleCancel={handleCancel}/>
            <CheckOut prices={prices} handleSubmit={handleSubmit}/>
        </div>
    )

};

export default Cart;
