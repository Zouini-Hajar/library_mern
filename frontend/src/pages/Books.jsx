import React, { useEffect, useState } from "react";
import "../styles/books.css";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  selectAllBooks,
  selectBooksGenres,
} from "../features/books/booksSlice";
import { Button, Radio, Space, Slider } from "antd";
import Book from "../components/Book";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const genres = useSelector(selectBooksGenres);
  const [genre, setGenre] = useState("");

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
              placement: 'bottom'
            }}
            style={{ width: '80%' }}
            defaultValue={[20, 50]}
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
            />
            <Button type="primary" icon={<UnorderedListOutlined />} />
          </div>
        </div>
        <div className="flex">
          {books.map((book) => (
            <Book book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
