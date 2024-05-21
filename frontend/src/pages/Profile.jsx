import React from "react";
import { UnlockOutlined } from "@ant-design/icons";
import "../styles/profile.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import ProfileClient from "../components/ProfileClient";
import ProfileAdmin from "../components/ProfileAdmin";
import { Button, Result } from "antd";

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <>
      {!user ? (
        <Result
          status="info"
          icon={<UnlockOutlined />}
          title="401"
          subTitle="PLease log in to access this route"
          extra={
            <Button type="primary" href="/">
              Back Home
            </Button>
          }
        />
      ) : user?.role == "client" ? (
        <ProfileClient />
      ) : (
        <ProfileAdmin />
      )}
    </>
  );
};

export default Profile;
