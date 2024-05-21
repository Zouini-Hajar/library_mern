import React, { useEffect, useState } from "react";
import "../styles/auth.css";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import Logo from "../components/Logo";
import { Button, Input, message } from "antd";
import AuthImage from "../components/AuthImage";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser, selectError } from "../features/user/userSlice";

const Auth = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [submitted, setSubmitted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!user.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]*$/.test(user.firstName.trim())) {
      newErrors.firstName = "Invalid first name";
    }

    if (!user.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]*$/.test(user.lastName.trim())) {
      newErrors.lastName = "Invalid last name";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email.trim())) {
      newErrors.email = "Invalid email address";
    }

    if (!user.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(user.phone_number.trim())) {
      newErrors.phone_number = "Phone number should be 10 digits";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
    } else if (user.password.trim().length < 8) {
      newErrors.password = "Password should be at least 8 characters";
    }

    setErrors(newErrors);

    if (type == "signup" && Object.keys(newErrors).length != 0) return false;
    else if (type == "signin" && (newErrors["email"] || newErrors["password"]))
      return false;

    return true;
  };

  const handleRegister = () => {
    if (validateForm()) {
      dispatch(createUser(user));
      setSubmitted(true);
    }
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(loginUser({ email: user.email, password: user.password }));
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: "error",
        content: error,
        className: "error-alert",
      });
    }
    if (submitted && !error) {
      navigate("/");
    }
  }, [error]);

  return (
    <div className="auth-container">
      {contextHolder}
      <div className="content">
        <div className="auth-logo">
          <Logo />
        </div>
        <div className="auth-div">
          {type == "signup" ? (
            <form>
              <div className="flex-row">
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    size="large"
                    id="firstName"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    status={errors.firstName && "error"}
                    placeholder="First name"
                  />
                  <small className="error-msg">{errors.firstName}</small>
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <Input
                    size="large"
                    id="lastName"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    status={errors.lastName && "error"}
                    placeholder="Last name"
                  />
                  <small className="error-msg">{errors.lastName}</small>
                </div>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  size="large"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  status={errors.email && "error"}
                  placeholder="Email"
                />
                <small className="error-msg">{errors.email}</small>
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <Input
                  size="large"
                  id="phoneNumber"
                  value={user.phone_number}
                  onChange={(e) =>
                    setUser({ ...user, phone_number: e.target.value })
                  }
                  status={errors.phone_number && "error"}
                  placeholder="Phone number"
                />
                <small className="error-msg">{errors.phone_number}</small>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input.Password
                  size="large"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  status={errors.password && "error"}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                <small className="error-msg">{errors.password}</small>
              </div>
              <div>
                <Button
                  onClick={(e) => handleRegister()}
                  size="large"
                  type="primary"
                >
                  Register
                </Button>
              </div>
            </form>
          ) : (
            <form>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  size="large"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  status={errors.email && "error"}
                  placeholder="Email"
                />
                <small className="error-msg">{errors.email}</small>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input.Password
                  size="large"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  status={errors.password && "error"}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                <small className="error-msg">{errors.password}</small>
              </div>
              <div>
                <Button
                  onClick={(e) => handleLogin()}
                  size="large"
                  type="primary"
                >
                  Sign In
                </Button>
              </div>
            </form>
          )}
          <AuthImage />
        </div>
      </div>
    </div>
  );
};

export default Auth;
