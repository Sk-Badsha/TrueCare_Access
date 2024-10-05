import React from "react";
import { Flex, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
function Register() {
  // form handler
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/users/register", values);
      console.log(res);

      if (res.status >= 200 && res.status < 300) {
        dispatch(hideLoading());
        message.success(res.data.message); // Show success message if user is registered
        navigate("/login");
      } else {
        dispatch(hideLoading());
        message.error(res.data.message); // Show error message for 409 (user already exists)
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response && error.response.data.message) {
        message.error(error.response.data.message); // Display API error message if available
      } else {
        message.error("Something went wrong!"); // Fallback error message
      }
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onfinishHandler} className="form-main">
        <h3 className="text-center">Register Now</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required></Input>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required></Input>
        </Form.Item>
        <Flex justify="space-between" align="center">
          <button
            className="btn btn-primary"
            style={{ "margin-right": " 30px" }}
          >
            Submit
          </button>
          <Link to="/login">Already Have an Account?</Link>
        </Flex>
      </Form>
    </div>
  );
}
export default Register;
