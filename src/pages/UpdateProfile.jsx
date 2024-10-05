import React, { useState } from "react";
import { Container } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { Form, message, Row, Col, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../redux/features/authSlice";
function UpdateProfile() {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState(user);
  const finishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/updateProfile",
        { ...values },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        console.log(res);
        message.success(res.data.message);
        dispatch(updateUser(res.data.data));
        setUsers(res.data.data);
        navigate("/dashboard");
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
      <h1>user Info: </h1>
      {user && (
        <Form layout="vertical" onFinish={finishHandler} initialValues={users}>
          <h5>Personal Details : </h5>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="name" name="name" required>
                <Input type="text" placeholder="Enter Your Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="email" name="email" required>
                <Input type="email" placeholder="Enter Your Email" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <div className="form-btn">
                <button className="btn btn-success">Update</button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
}

export default UpdateProfile;
