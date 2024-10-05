import React from "react";
import { Form, Input, Flex, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { login as authLogin } from "../../redux/features/authSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/users/login", values);
      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message || "Login successful!");
        dispatch(authLogin(res.data.data.user));
        navigate("/dashboard");
      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("error: ", error);

      if (error.response && error.response.data) {
        // If it's an API error from the server, show the server message
        message.error(error.response.data.message || "Something went wrong");
      } else {
        // If it's some other kind of error, display a generic message
        message.error("Network error or server is down");
      }
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="form-main">
        <h3 className="text-center">Login Now</h3>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" required />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" required />
        </Form.Item>
        <Form.Item>
          <button
            style={{ width: "100%" }}
            className="btn btn-success"
            type="submit"
          >
            Login
          </button>
        </Form.Item>
        <Flex justify="space-between" align="center">
          <Link to="/register">Register Now!</Link>
          <Link to="/users/forgot-password">Forgot Password?</Link>
        </Flex>
      </Form>
    </div>
  );
};

export default App;
