import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Card, Typography } from "antd"; // Import AntD's Typography for better text styling
import {
  CalendarOutlined,
  DollarOutlined,
  MedicineBoxOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"; // Icons for better visual elements

const { Title, Text } = Typography;

function DoctorList({ doctor }) {
  const navigate = useNavigate();
  return (
    <Col xs={24} sm={12} lg={6} className="mb-4 mx-2">
      {" "}
      {/* Responsive grid */}
      <Card
        hoverable
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          transition: "transform 0.3s, box-shadow 0.3s",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        styles={{ padding: "20px" }}
        className="doctor-card"
      >
        {/* Card Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Title level={4} style={{ color: "white" }}>
            Dr. {doctor.firstName} {doctor.lastName}
          </Title>
        </div>

        {/* Card Body */}
        <div style={{ padding: "15px 10px" }}>
          <Text>
            <MedicineBoxOutlined /> <b>Specialization:</b>{" "}
            {doctor.specializationOn}
          </Text>
          <br />
          <Text>
            <CalendarOutlined /> <b>Experience:</b> {doctor.experience} years
          </Text>
          <br />
          <Text>
            <DollarOutlined /> <b>Fee:</b> ₹{doctor.feesPerConsultation}
          </Text>
          <br />
          <Text>
            <ClockCircleOutlined /> <b>Timings:</b> {doctor.timings?.start} -{" "}
            {doctor.timings?.end}
          </Text>
        </div>
      </Card>
    </Col>
  );
}

export default DoctorList;
