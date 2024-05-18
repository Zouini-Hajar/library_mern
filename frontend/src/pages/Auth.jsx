import React from "react";
import "../styles/auth.css";
import Logo from "../components/Logo";
import { Button, Input } from "antd";
import AuthImage from "../components/AuthImage";

const Auth = () => {
    
  return (
    <div className="auth-container">
      <div className="content">
        <div className="auth-logo">
          <Logo />
        </div>
        <div className="auth-form">
          <form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Input
                size="large"
                id="firstName"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Input
                size="large"
                id="lastName"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input size="large" id="email" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                size="large"
                id="phoneNumber"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
                <Button size="large" type="primary">Register</Button>
            </div>
          </form>
          <AuthImage />
        </div>
      </div>
    </div>
  );
};

export default Auth;
