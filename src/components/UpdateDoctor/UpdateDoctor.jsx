import axios from "axios";
import React from "react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, message, Row, Col, Input, TimePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice.js";
function UpdateDoctor() {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  // get doctor details
  const getDoctorDetails = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        {
          userId: params.id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const formattedDoctorData = {
          ...res.data?.data,
          timings: [
            dayjs(res.data?.data.timings.start, "HH:mm"),
            dayjs(res.data?.data.timings.end, "HH:mm"),
          ],
        };
        setDoctor(formattedDoctorData);
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      message.error(error.message);
    }
  };

  const finishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateDoctorInfo",
        { ...values, userId: user._id },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        console.log(res);

        message.success(res.data.message);
        navigate("/dashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);
  return (
    <div>
      <h1>Doctor Info: </h1>
      {doctor && (
        <Form layout="vertical" onFinish={finishHandler} initialValues={doctor}>
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
              <Form.Item
                label="Specialization"
                name="specializationOn"
                required
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Experience" name="experience">
                <Input disabled />
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
                <Input disabled />
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
                <button className="btn btn-success">Update</button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
}

export default UpdateDoctor;
