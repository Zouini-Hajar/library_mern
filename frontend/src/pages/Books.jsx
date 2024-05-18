import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectAllBooks } from "../features/books/booksSlice";

const Books = () => {
    const dispatch = useDispatch();
    const books = useSelector(selectAllBooks);

    console.log(books);

    useEffect(() => {
        dispatch(getBooks());
    }, []);

    return (
        <h1>Books</h1>
    );
}

export default Books;