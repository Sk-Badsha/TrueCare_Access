import React from "react";
import { Container } from "../index.js";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice.js";
import { updateUser } from "../../redux/features/authSlice.js";
import { useEffect } from "react";
import axios from "axios";

function Notification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.userData);
  // Fetch notifications when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/users/getAllNotificationsByID",
          { userId: user._id },
          { withCredentials: true }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          dispatch(
            updateUser({
              ...user,
              notification: res.data.data.notification,
              seenNotification: res.data.data.seenNotification,
            })
          );
        } else {
          message.error(res.data?.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        message.error("Failed to fetch notifications.");
      }
    };

    fetchNotifications();
  }, [dispatch, user._id]);
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        // Changed to POST request
        "/api/v1/users/get-all-notifications",
        { userId: user._id }, // Sending userId in request body
        { withCredentials: true }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(updateUser(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  // Function to delete all read notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        // Changed to POST request
        "/api/v1/users/delete-all-notifications",
        { userId: user._id }, // Sending userId in request body
        { withCredentials: true }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(updateUser(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  return (
    <Container>
      <p className="m-3 text-center fs-1 fw-bold text-primary">Notifications</p>
      <Tabs className="border rounded-3 shadow-sm" tabBarGutter={60}>
        <Tabs.TabPane tab="Unread" key="0">
          <div className="d-flex justify-content-end">
            <p
              className="fs-5 link-primary text-primary"
              style={{ cursor: "pointer", fontWeight: "600" }}
              onClick={handleMarkAllRead}
            >
              Mark all Read
            </p>
          </div>
          {user?.notification?.map((msg, index) => (
            <div
              key={index}
              className="card mb-3 border-0 shadow-sm"
              style={{ cursor: "pointer", borderRadius: "10px" }}
              onClick={() => navigate(`${msg.onClickPath}`)}
            >
              <div className="card-body">
                <p className="card-text fs-5">{msg.message}</p>
              </div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key="1">
          <div className="d-flex justify-content-end">
            <p
              className="fs-5 text-danger"
              style={{ cursor: "pointer", fontWeight: "600" }}
              onClick={handleDeleteAllRead}
            >
              Delete all Read
            </p>
          </div>
          {user?.seenNotification?.map((msg, index) => (
            <div
              key={index}
              className="card mb-3 border-0 shadow-sm"
              style={{ cursor: "pointer", borderRadius: "10px" }}
            >
              <div
                className="card-body"
                onClick={() => navigate(`${msg.data.onClickPath}`)}
              >
                <p className="card-text fs-5">{msg.message}</p>
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
}

export default Notification;
