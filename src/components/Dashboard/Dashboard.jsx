import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import { showLoading, hideLoading } from "../../redux/features/alertSlice.js";
import { useDispatch } from "react-redux";
import { message, Row } from "antd";
import axios from "axios";
import DoctorList from "./DoctorList.jsx";

function Dashboard() {
  const [doctors, setDoctors] = useState([{}]);
  const dispatch = useDispatch();
  const getAllDoctors = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get("/api/v1/users/getAllDoctors", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(hideLoading());
        setDoctors(res.data?.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
  return (
    <Container>
      <h4 className="text-center mb-4">All Doctors</h4>
      <Row>
        {doctors &&
          doctors.map((doctor) => (
            <DoctorList key={doctor._id} doctor={doctor} />
          ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
