import React from "react";
import { Container } from "../../components/index.js";
import { message, Table } from "antd";
import { useLoaderData } from "react-router-dom";

import axios from "axios";
function Doctors() {
  const columns = [
    {
      title: "Name",
      dataIndex: `Name`,
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Specialized On",
      dataIndex: "specializationOn",
      key: "specializationOn",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        const date = new Date(record.createdAt);
        return date.toUTCString();
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleChangeAccount(record, "approved")}
            >
              Approve
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

  const data = useLoaderData();

  const handleChangeAccount = async (record, status) => {
    const res = await axios.post(
      "/api/v1/admin/changeAccountStatus",
      {
        doctorId: record._id,
        status: status,
      },
      {
        withCredentials: true,
      }
    );
    console.log("res: ", res);

    if (res.data.success) {
      message.success(res.data.message);
    } else {
      message.error(res.response.data.message);
    }
  };

  return (
    <Container>
      <Table columns={columns} dataSource={data} />
    </Container>
  );
}

export default Doctors;

export const doctorsLoader = async () => {
  const res = await axios.get("/api/v1/admin/getAllDoctors", {
    withCredentials: true,
  });
  message.success(res.data.message);
  return res.data?.data;
};
