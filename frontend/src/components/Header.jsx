import React from "react";
import "../styles/header.css";
import {
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Space, Tooltip } from "antd";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: "0",
  },
  {
    label: <Link to="/books">Books</Link>,
    key: "1",
  },
];

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <div className="search-bar">
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className="menu">
              Menu
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Input
          placeholder="Find books here.."
          size="large"
          onChange={console.log("Searching for books...")}
          suffix={<SearchOutlined />}
          style={{ width: "90%" }}
        />
      </div>
      <Tooltip title="cart">
        <Button type="text" size="large" shape="circle">
          <Link to="/cart">
            <ShoppingCartOutlined />
          </Link>
        </Button>
      </Tooltip>
      <div>
        <Button type="text" size="large" className="signIn-btn">
          <Link to="/auth">Sign In</Link>
        </Button>
        <Button type="primary" size="large" className="signUp-btn">
          <Link to="/auth">Create Account</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
