import { Menu } from "antd";
import { SettingOutlined, BookOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "../styles/profile.css";

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
  const [selectedItem, setSelectedItem] = useState("1");

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
        {selectedItem == "1" ? "hello" : "hey"}
      </div>
    </div>
  );
};

export default ProfileClient;
