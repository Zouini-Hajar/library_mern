import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectAllBooks } from "../features/books/booksSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BestRented from "./BestRented";

var settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  autoplay: true,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  arrows: true,
};

const getRandomBooks = (books, num) => {
  const shuffled = books.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const BestRentedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const bestRentedBooks = getRandomBooks(books, 10);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div className=" pb-16 pt-1 bg-light-purple my-12" id="our-services">
      <div
        style={{
          margin: "1rem 3rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Top rented books</h2>
      </div>
      <div className="mt-12 mx-12">
        <Slider {...settings}>
          {bestRentedBooks.map((book, index) => (
            <div
              key={index}
              className="bg-beige h-72 text-dark-purple text-center p-6 rounded-xl"
            >
              <BestRented book={book} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default BestRentedBooks;
