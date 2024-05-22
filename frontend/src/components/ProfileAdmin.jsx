import { Menu } from "antd";
import React, { useState } from "react";
import "../styles/profile.css";
import BooksTable from "./BooksTable";

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
  const [selectedItem, setSelectedItem] = useState("1");

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
        {selectedItem == "1" ? <BooksTable /> : <></>}
      </div>
    </div>
  );
};

export default ProfileAdmin;
