import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import "../../styles/RegisterStyles.css";
import dotenv from "dotenv";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   console.log(import.meta.env.VITE_BACKEND_ENDPOINT);
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/users/register", values);
      console.log(res);

      if (res.status >= 200 && res.status < 300) {
        dispatch(hideLoading());
        message.success(res.data.message);
        navigate("/login");
      } else {
        dispatch(hideLoading());
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onfinishHandler} className="form-main">
        <h3 className="text-center">Register Now</h3>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input type="text" required />
        </Form.Item>
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
        <div className="form-footer">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <Link to="/login" className="login-link">
            Already Have an Account?
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
