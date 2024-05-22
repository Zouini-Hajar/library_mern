import React from "react";
import "../styles/header.css";
import {
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, Space, Tooltip } from "antd";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../features/user/userSlice";

const Header = () => {
  const naviagate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    naviagate('/');
  };

  const menuItems = [
    {
      label: <Link to="/">Home</Link>,
      key: "0",
    },
    {
      label: <Link to="/books">Books</Link>,
      key: "1",
    },
  ];

  const userItems = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: "0",
    },
    {
      label: (
        <button className="logout-btn" onClick={(e) => handleLogOut()}>
          <LogoutOutlined /> Log Out
        </button>
      ),
      key: "1",
    },
  ];

  return (
    <header>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <div className="search-bar">
        <Dropdown menu={{ items: menuItems }}>
          <Space className="menu">
            Menu
            <DownOutlined />
          </Space>
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
      {!user ? (
        <div>
          <Button type="text" size="large" className="signIn-btn">
            <Link to="/auth/signin">Sign In</Link>
          </Button>
          <Button type="primary" size="large" className="signUp-btn">
            <Link to="/auth/signup">Create Account</Link>
          </Button>
        </div>
      ) : (
        <div>
          <Dropdown menu={{ items: userItems }}>
            <Space align="center" className="user">
              <Avatar size="small" icon={<UserOutlined />} />{" "}
              {user.role == 'client' ? user.firstName + " " + user.lastName : "Admin"}
            </Space>
          </Dropdown>
        </div>
      )}
    </header>
  );
};

export default Header;
