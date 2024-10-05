import React from "react";
import "../../styles/ContentHeaderStyles.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "antd";
const ContentHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.userData);
  return (
    <header className="content-header">
      <Badge
        count={user?.notification?.length}
        onClick={() => {
          navigate("/notification");
        }}
      >
        <i className="fa-solid fa-bell"></i>
      </Badge>
      <Link to={`/user/update-profile/${user?._id}`}>
        {user && user.name?.toUpperCase()}
      </Link>
    </header>
  );
};

export default ContentHeader;
