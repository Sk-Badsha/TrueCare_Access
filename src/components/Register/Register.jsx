import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import "../../styles/RegisterStyles.css";

function Register() {
  const backendUrl = import.meta.env.VITE_BACKEND_ENDPOINT;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${backendUrl}/api/v1/users/register`,
        values
      );

      if (res.status >= 200 && res.status < 300) {
        dispatch(hideLoading());
        message.success(res.data.message);
        navigate("/verifyAccount", { state: { email: values.email } });
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
    <div className="register-container">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h3 className="register-form-title">Register Now</h3>
        <Form.Item label="Name" name="name" className="register-form-item">
          <Input type="text" required className="register-input" />
        </Form.Item>
        <Form.Item label="Email" name="email" className="register-form-item">
          <Input type="email" required className="register-input" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          className="register-form-item"
        >
          <Input type="password" required className="register-input" />
        </Form.Item>

        <div className="register-footer">
          <button className="register-btn-submit">Submit</button>
          <Link to="/login" className="register-login-link">
            Already Have an Account?
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
