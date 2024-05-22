import React, { useState } from "react";
import "../styles/updateclient.css";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { updateClient } from "../features/clients/clientsSlice";

const UpdateClient = () => {
    const dispatch = useDispatch();
    const oldUser = useSelector(selectUser);

    const [user, setUser] = useState({
        id: oldUser._id,
        firstName: oldUser.firstName || "",
        lastName: oldUser.lastName || "",
        email: oldUser.email || "", // Changed state key to "email"
        phone_number: oldUser.phone_number || "",
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

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = () => {
        if (validateForm()) {
            dispatch(updateClient(user)).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    message.success('Client updated successfully');
                } else {
                    message.error('Failed to update client');
                }
            });
        }
    };

    return (
        <div className="updateC-container">
            <div className="content">
                <div className="form-div">
                    <form autoComplete="off">
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
                                value={user.email} // Updated state key
                                onChange={(e) => setUser({ ...user, email: e.target.value })} // Updated state key
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
                            <Button
                                onClick={handleUpdate}
                                size="large"
                                type="primary"
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateClient;
