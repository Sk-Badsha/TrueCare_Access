import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice.js";
import axios from "axios";
function ForgotPassword() {
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/users/forgot-password", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("error: ", error);
      message.error(error.response.data.message);
    }
  };
  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="form-main">
        <h3 className="text-center">Forgot Password</h3>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your registered email!" },
          ]}
        >
          <Input type="email" required />
        </Form.Item>
        <button
          style={{ width: "100%" }}
          className="btn btn-success"
          type="submit"
        >
          Forgot Password
        </button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
