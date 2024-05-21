import { Button, Menu } from "antd";
import {
  SettingOutlined,
  BookOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientBorrowings,
  selectBorrowings,
} from "../features/borrowings/borrowingsSlice";
import { selectUser } from "../features/user/userSlice";
import Book from "./Book";

const items = [
  {
    key: "1",
    label: "Borrowed Books",
    icon: <BookOutlined />,
  },
  {
    key: "2",
    label: "Account",
    icon: <SettingOutlined />,
  },
];

const ProfileClient = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [selectedItem, setSelectedItem] = useState("1");
  const borrowedBooks = useSelector(selectBorrowings);

  useEffect(() => {
    dispatch(getClientBorrowings(user._id));
  }, [borrowedBooks]);

  return (
    <div className="profile-container">
      <Menu
        onClick={(e) => setSelectedItem(e.key)}
        style={{
          width: 256,
          height: "100%",
        }}
        defaultSelectedKeys={selectedItem}
        mode="inline"
        items={items}
      />
      <div className="profile-content">
        {selectedItem == "1" ? (
          <>
            <div className="flex">
              <h2>Borrowed Books</h2>
              <div>
                <Button
                  icon={<AppstoreOutlined />}
                  style={{ marginRight: "0.5rem" }}
                />
                <Button type="primary" icon={<UnorderedListOutlined />} />
              </div>
            </div>
            <div className="flex">
              { borrowedBooks.map((book, i) => <Book key={i} book={book} />) }
            </div>
          </>
        ) : (
          "hey"
        )}
      </div>
    </div>
  );
};

export default ProfileClient;
