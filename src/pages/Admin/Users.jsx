import React from "react";
import { useLoaderData } from "react-router-dom";
import { Container } from "../../components/index.js";
import { message, Table } from "antd";
import axios from "axios";
function Users() {
  const data = useLoaderData();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "IsAdmin",
      dataIndex: "isADmin",
      key: "isAdmin",
      render: (text, record) => {
        return record.isAdmin ? "Yes" : "No";
      },
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
        <div className="d-flex ">
          <button className="btn btn-danger mx-2">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Table columns={columns} dataSource={data}></Table>
    </Container>
  );
}

export default Users;

export const usersLoader = async () => {
  const res = await axios.get("/api/v1/admin/getAllUsers", {
    withCredentials: true,
  });
  message.success(res.data.message);
  return res.data?.data;
};
