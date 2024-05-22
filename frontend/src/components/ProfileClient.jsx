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
import UpdateClient from "./UpdateClient";

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
  const borrowings = useSelector(selectBorrowings);
  const [selectedItem, setSelectedItem] = useState("1");
  const [view, setView] = useState("list");

  useEffect(() => {
    dispatch(getClientBorrowings(user._id));
  }, [borrowings]);

  return (
    <div className="profile-container">
      <Menu
        onClick={(e) => setSelectedItem(e.key)}
        style={{
          width: 270,
          height: "100%",
        }}
        defaultSelectedKeys={selectedItem}
        mode="inline"
        items={items}
      />
      <div className="profile-content">
        {selectedItem == "1" ? (
          <>
            <div className="flex" style={{ marginBottom: "2rem" }}>
              <h2>Borrowed Books</h2>
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
            <div className={view == "list" ? "flex-column" : "flex"}>
              {borrowings.map((borrowing, i) => (
                <Book
                  key={i}
                  book={borrowing.book}
                  view={view}
                  borrowing={{
                    id: borrowing.borrow_id,
                    startDate: borrowing.borrowingdate,
                    endDate: borrowing.returndate,
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <UpdateClient/>
        )}
      </div>
    </div>
  );
};

export default ProfileClient;
