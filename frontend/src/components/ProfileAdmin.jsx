import { Button, Form, Input, Menu, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { addBook, getBooks, selectAllBooks } from "../features/books/booksSlice";
import Book from "./Book";
import Clients from "./Clients";

const items = [
  {
    key: "1",
    label: "Books",
    icon: <i className="fa-solid fa-book"></i>,
  },
  {
    key: "2",
    label: "Clients",
    icon: <i className="fa-solid fa-users"></i>,
  },
];

const ProfileAdmin = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const [selectedItem, setSelectedItem] = useState("1");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.authors = values.authors.split(",").map((author) => author.trim());
        values.genres = values.genres.split(",").map((genre) => genre.trim());
        values.numberOfPages = Number(values.numberOfPages);
        values.averageRating = Number(values.averageRating);
        values.price = Number(values.price);
        values.stock = Number(values.stock);

        dispatch(addBook(values));
        setIsAddModalOpen(false);
        message.success("Book added successfully!");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error("Error adding the book!");
      });
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    dispatch(getBooks());
  }, [books]);

  return (
    <div className="profile-container">
      <div>
        <Menu
          onClick={(e) => setSelectedItem(e.key)}
          defaultSelectedKeys={selectedItem}
          mode="inline"
          style={{
            width: 250,
            height: "100%",
          }}
          items={items}
        />
      </div>
      <div className="profile-content">
        {selectedItem === "1" ? (
          <>
            <div className="flex" style={{ marginBottom: "2rem" }}>
              <h2>All Books</h2>
              <div>
                <Button
                  icon={<PlusOutlined />}
                  style={{ marginRight: "0.5rem" }}
                  type="primary"
                  onClick={(e) => setIsAddModalOpen(true)}
                />
              </div>
            </div>
            <div className="flex-column">
              {books.map((book) => (
                <Book
                  key={book._id}
                  book={book}
                  view={"list"}
                  editMode={true}
                />
              ))}
            </div>
          </>
        ) : <Clients />}
      </div>
      <Modal
        title="Add Book"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleCancel}
        okText="Add"
      >
        <Form form={form} layout="vertical" name="add_book_form">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input size="large" placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="authors"
            label="Authors"
            rules={[{ required: true, message: "Please input the authors!" }]}
          >
            <Input size="large" placeholder="Authors (comma separated)" />
          </Form.Item>
          <Form.Item
            name="isbn"
            label="ISBN"
            rules={[{ required: true, message: "Please input the ISBN!" }]}
          >
            <Input size="large" placeholder="ISBN" />
          </Form.Item>
          <Form.Item name="publisher" label="Publisher">
            <Input size="large" placeholder="Publisher" />
          </Form.Item>
          <Form.Item name="publicationDate" label="Publication Date">
            <Input size="large" type="date" placeholder="Publication Date" />
          </Form.Item>
          <Form.Item
            name="genres"
            label="Genres"
            rules={[{ required: true, message: "Please input the genres!" }]}
          >
            <Input size="large" placeholder="Genres (comma separated)" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea size="large" placeholder="Description" />
          </Form.Item>
          <Form.Item name="language" label="Language">
            <Input size="large" placeholder="Language" />
          </Form.Item>
          <Form.Item name="numberOfPages" label="Number of Pages">
            <Input size="large" type="number" placeholder="Number of Pages" />
          </Form.Item>
          <Form.Item
            name="coverImageUrl"
            label="Cover Image URL"
            rules={[
              {
                required: true,
                message: "Please input the cover image URL!",
              },
            ]}
          >
            <Input size="large" placeholder="Cover Image URL" />
          </Form.Item>
          <Form.Item
            name="averageRating"
            label="Average Rating"
            rules={[
              {
                required: true,
                message: "Please input the average rating!",
              },
            ]}
          >
            <Input size="large" type="number" placeholder="Average Rating" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input size="large" type="number" placeholder="Price" />
          </Form.Item>
          <Form.Item name="stock" label="Stock">
            <Input size="large" type="number" placeholder="Stock" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileAdmin;
