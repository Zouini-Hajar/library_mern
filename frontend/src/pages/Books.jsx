import React, { useEffect, useState } from "react";
import "../styles/books.css";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectAllBooks } from "../features/books/booksSlice";
import { Button, Radio, Space, Slider } from "antd";
import Book from "../components/Book";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const genres = [...new Set(books.flatMap((book) => book.genres))];
  const [genre, setGenre] = useState("");
  //const [minMaxPrices, setMinMaxPrices] = useState([]);
  const [view, setView] = useState("grid");

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div className="books-container">
      <div className="filter">
        <h2>Filter</h2>
        <div className="filter-item">
          <h3>Genres</h3>
          <Radio.Group
            className="genres-radio"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          >
            <Space direction="vertical">
              <Radio value="all">All</Radio>
              {genres.map((genre) => (
                <Radio value={genre}>{genre}</Radio>
              ))}
            </Space>
          </Radio.Group>
          <h3>Price range</h3>
          <Slider
            range={{
              draggableTrack: true,
            }}
            tooltip={{
              formatter: (value) => `$${value}`,
            }}
            style={{ width: "80%" }}
            defaultValue={[5, 30]}
            onChangeComplete={(value) => console.log(value)}
          />
        </div>
      </div>
      <div className="books">
        <h2>Books</h2>
        <div className="flex" style={{ marginBottom: "2rem" }}>
          <small>Over {books.length}+ books available here, find it now!</small>
          <div>
            <Button
              icon={<AppstoreOutlined />}
              style={{ marginRight: "0.5rem" }}
              onClick={(e) => setView("grid")}
              type={view == "list" ? "" : "primary"}
            />
            <Button
              icon={<UnorderedListOutlined />}
              onClick={(e) => setView("list")}
              type={view == "grid" ? "" : "primary"}
            />
          </div>
        </div>
        <div className="flex">
          {!genre || genre == "all"
            ? books.map((book, i) => <Book key={i} book={book} view={view} />)
            : books
                .filter((book) => book.genres.indexOf(genre) != -1)
                .map((book, i) => <Book key={i} book={book} view={view} />)}
        </div>
      </div>
    </div>
  );
};

export default Books;
