import React from "react";
import { Container } from "../components/index.js";
import { useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
function ChangePassword() {
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.userData);
  const [form] = Form.useForm();
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/users/change-Password", values, {
        withCredentials: true,
      });

      if (res.data.success) {
        message.success(res.data.message);
        form.resetFields();
      } else {
        setError(res.data.message);
        message.error(res.data.message);
      }
    } catch (error) {
      console.log("error: ", error);
      setError(error.response.data.message);
      message.error(error.response.data.message);
    }
  };
  return (
    <Container>
      {error && (
        <h3
          style={{
            color: "black",
            textAlign: "center",
            backgroundColor: "red",
          }}
        >
          {error}
        </h3>
      )}
      <div className="form-container">
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 9,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 1500,
          }}
          onChange={() => setError("")}
          onFinish={onfinishHandler}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Name" name="name" wrapperCol={{ span: 24 }}>
            <Input prefix={<UserOutlined />} value={user?.name} disabled />
            <div></div>
          </Form.Item>

          <Form.Item
            label="Current Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            label="Update Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
}

export default ChangePassword;
