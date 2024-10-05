import { message, Table } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import dayjs from "dayjs";
function Appointments() {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState();

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: `_id`,
    },

    {
      title: "Doctor Name",
      dataIndex: "DoctorName",
      render: (text, record) =>
        ` ${record.doctorInfo.firstName} ${record.doctorInfo.lastName} `,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const fetchAppointments = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get("/api/v1/users/user-appointments", {
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
    <div>
      <Table columns={columns} dataSource={appointments} />
    </div>
  );
}

export default Appointments;
