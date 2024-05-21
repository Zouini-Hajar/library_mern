import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectAllBooks } from "../features/books/booksSlice";
import TrendingBook from "./TrendingBook";
import '../styles/trendingbooks.css';

const getRandomBooks = (books, num) => {
    const shuffled = books.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

export default function Trending() {
    const dispatch = useDispatch();
    const books = useSelector(selectAllBooks);
    const trendingBooks = getRandomBooks(books, 5);

    useEffect(() => {
        dispatch(getBooks());
    }, []);

    return (
        <div className="trending-books" style={{ marginTop: "5rem"}}>
            <div style={{marginBottom: "5rem" , display: 'flex' , flexDirection:'column' , alignItems: 'center'}}>
                <h2>Trending Titles</h2>
                <small style={{width:'50%' , textAlign:'center'}}>Stay ahead of the literary curve with our curated selection of the hottest reads that everyone's talking about! </small>
            </div>
            <div className="flex">
                {trendingBooks.map((book) => (
                    <TrendingBook book={book} />
                ))}
            </div>
        </div>
    );
}
