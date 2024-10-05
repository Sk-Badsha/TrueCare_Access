import React from "react";
import { Form, message, Row, Col, Input, TimePicker } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice.js";
import moment from "moment";

function AddDoctor() {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const finishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: {
            start: values.timings[0].format("HH:mm"),
            end: values.timings[1].format("HH:mm"),
          },
        },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      console.log(res.data);

      if (res.data.success) {
        console.log(res);

        message.success(res.data.message);
        navigate("/dashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.status === 404) {
        message.error("User already applied for a Doctor Account");
      } else {
        message.error(error.message);
      }
    }
  };
  return (
    <div className="form-wrapper">
      <h3 className="text-center">Apply Doctor</h3>
      <Form layout="vertical" onFinish={finishHandler}>
        <h5>Personal Details : </h5>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="First Name" name="firstName" required>
              <Input type="text" placeholder="Enter First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Last Name" name="lastName" required>
              <Input type="text" placeholder="Enter Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Contact No."
              name="phone"
              rules={[
                { required: true, message: "Phone number is required" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              ]}
            >
              <Input type="phone" placeholder="Enter Phone Number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Email" name="email" required>
              <Input type="email" placeholder="Enter Email here" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="Your Portfolio here" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Address" name="address" required>
              <Input type="text" placeholder="Enter Your Address" />
            </Form.Item>
          </Col>
        </Row>

        <h5>Professional Details : </h5>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Specialization" name="specializationOn" required>
              <Input type="text" placeholder="Your Specialization Here" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Experience" name="experience">
              <Input type="number" placeholder="Enter Your Experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees"
              name="feesPerConsultation"
              required
              rules={[
                { required: true, message: "Please enter Fee" },
                {
                  pattern: /^[0-9]/,
                  message: "Please enter a valid Fee",
                },
              ]}
            >
              <Input type="number" placeholder="Your FeesPerConsultation" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timing" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <div className="form-btn">
              <button className="btn btn-success">Apply</button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddDoctor;
