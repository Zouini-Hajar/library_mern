import React, { useState } from "react";
import "../styles/book.css";
import { StarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { updateBorrowing } from "../features/borrowings/borrowingsSlice";
import { deleteBook, updateBook } from "../features/books/booksSlice";

const Book = ({ book, view, borrowing, editMode }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [form] = Form.useForm();

  const showEditModal = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      ...book,
      authors: book.authors.join(", "),
      genres: book.genres.join(", "),
      publicationDate: new Date(book.publicationDate).toLocaleDateString()
    });
  };

  const handleEditOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.authors = values.authors.split(",").map((author) => author.trim());
        values.genres = values.genres.split(",").map((genre) => genre.trim());
        values.numberOfPages = Number(values.numberOfPages);
        values.averageRating = Number(values.averageRating);
        values.price = Number(values.price);
        values.stock = Number(values.stock);
        
        dispatch(updateBook({ _id: book._id, ...values }))
        setIsEditModalOpen(false);
        message.success("Book updated successfully!");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error("Error updating the book!");
      });
  };

  const handleDeleteConfirmOk = () => {
    dispatch(deleteBook(book._id));
    setIsDeleteConfirmVisible(false);
    message.success("Book deleted successfully!");
  };

  const onAddToCartClick = () => {
    dispatch(addToCart(book));
  };

  const onReturnClick = () => {
    dispatch(updateBorrowing(borrowing.id));
  };

  return (
    <>
      {view === "grid" ? (
        <div className="book-container">
          <img src={book.coverImageUrl} alt="Book Cover" />
          <Button
            type="primary"
            shape="circle"
            className="float-btn"
            icon={
              !borrowing ? (
                <ShoppingCartOutlined />
              ) : (
                <i className="fa-solid fa-rotate-left"></i>
              )
            }
            onClick={!borrowing ? onAddToCartClick : onReturnClick}
          />
          <small className="rating">
            <StarOutlined style={{ color: "#FEB941" }} /> {book.averageRating} ·{" "}
            {book.reviews.length} reviews
          </small>
          <p className="genre">{book.genres[0]}</p>
          <p className="title">{book.title}</p>
          <small className="author">{book.authors[0]}</small>
          <p className="price">${book.price}</p>
        </div>
      ) : (
        <div className="book-list-item">
          <div className="img-container">
            <img src={book.coverImageUrl} alt="Book Cover" />
          </div>
          <div className="book-details">
            <div>
              {book.genres.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
            <p className="title">{book.title}</p>
            <small className="author">{book.authors[0]}</small>
            <span className="dot"> · </span>
            <span className="rating">
              <i className="fa-solid fa-star" style={{ color: "#FFC100" }}></i>{" "}
              {book.averageRating}
            </span>
            <small> ({book.reviews.length} reviews)</small>
            <p className="book-description">{book.description}</p>
          </div>
          <div>
            {!editMode && <p className="price">${book.price}</p>}
            {borrowing && (
              <>
                <small>
                  From: {new Date(borrowing.startDate).toLocaleDateString()}
                </small>
                <br />
                <small>
                  To:{" "}
                  {borrowing.endDate
                    ? new Date(borrowing.endDate).toLocaleDateString()
                    : "_"}
                </small>
                <br />
              </>
            )}
            {editMode ? (
              <div className="actions-btns">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<i className="fa-solid fa-pen"></i>}
                  style={{ marginRight: "0.2rem" }}
                  onClick={showEditModal}
                />
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<i className="fa-solid fa-trash"></i>}
                  onClick={(e) => setIsDeleteConfirmVisible(true)}
                />
              </div>
            ) : (
              <Button
                className="return-btn"
                type="primary"
                icon={
                  !borrowing ? (
                    <ShoppingCartOutlined />
                  ) : (
                    <i className="fa-solid fa-rotate-left"></i>
                  )
                }
                onClick={!borrowing ? onAddToCartClick : onReturnClick}
              >
                {!borrowing ? "Add To Cart" : "Return"}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      <Modal
        title="Update Book"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Update"
      >
        <Form
          form={form}
          layout="vertical"
          name="update_book_form"
          initialValues={book}
        >
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
            <Input size="large" type="text" placeholder="Publication Date" />
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

      <Modal
        title="Confirm Deletion"
        open={isDeleteConfirmVisible}
        onOk={handleDeleteConfirmOk}
        onCancel={(e) => setIsDeleteConfirmVisible(false)}
        okText="Delete"
        okType="danger"
      >
        <p>Are you sure you want to delete this book?</p>
      </Modal>
    </>
  );
};

export default Book;
