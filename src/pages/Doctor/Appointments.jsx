import React from "react";
import { Container } from "../../components/index.js";
import { message, Table } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import dayjs from "dayjs";
function Appointments() {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState();
  const handleChangeAccount = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/changeBookingStatus",
        {
          appointmentId: record._id,
          status: status,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(appointments);

        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Appointment ID",
      dataIndex: `_id`,
    },

    {
      title: "Patient Name",
      dataIndex: "patientName",
      render: (text, record) => ` 
      ${record.userInfo.name}`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text) => dayjs(text).format("HH:mm A"),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success mx-2"
              onClick={() => handleChangeAccount(record, "approve")}
            >
              Accept
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => handleChangeAccount(record, "pending")}
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  const fetchAppointments = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        withCredentials: true,
      });
      dispatch(hideLoading());
      setAppointments(res.data.data);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, []);
  return (
    <Container>
      {console.log(appointments)}
      <h3 className="text-center">Doctor Appointments List: </h3>
      <Table columns={columns} dataSource={appointments} />
    </Container>
  );
}

export default Appointments;
