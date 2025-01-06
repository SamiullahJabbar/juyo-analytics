import React from "react";
import { Card, Row, Col, Statistic, Table, Progress } from "antd";
import { LineChartOutlined, UserOutlined, DollarOutlined, PieChartOutlined } from "@ant-design/icons";
import { Bar, Line, Pie } from "@ant-design/charts";
import AppLayout from "../../components/Layout/AppLayout";

const Dashboard = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const data = [
    { key: "1", name: "Project A", status: "Active", actions: "View Details" },
    { key: "2", name: "Project B", status: "Pending", actions: "View Details" },
    { key: "3", name: "Project C", status: "Completed", actions: "View Details" },
  ];

  const barData = [
    { type: "Room Revenue", value: 50000 },
    { type: "Food & Beverage", value: 35000 },
    { type: "Miscellaneous", value: 15000 },
  ];

  const pieData = [
    { type: "Direct Bookings", value: 40 },
    { type: "OTA Bookings", value: 35 },
    { type: "Corporate Bookings", value: 25 },
  ];

  const lineData = [
    { date: "2023-01", revenue: 30000 },
    { date: "2023-02", revenue: 40000 },
    { date: "2023-03", revenue: 35000 },
    { date: "2023-04", revenue: 45000 },
    { date: "2023-05", revenue: 50000 },
  ];

  return (
    <AppLayout
      Children={
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-semibold mb-6">Your Dashboard</h1>

          {/* Top Stats */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6} xl={6}>
              <Card className="shadow-lg">
                <Statistic
                  title="Total Users"
                  value={1128}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6} xl={6}>
              <Card className="shadow-lg">
                <Statistic
                  title="Revenue"
                  value={9321}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6} xl={6}>
              <Card className="shadow-lg">
                <Statistic
                  title="New Orders"
                  value={318}
                  prefix={<LineChartOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6} xl={6}>
              <Card className="shadow-lg">
                <Statistic
                  title="Feedbacks"
                  value={150}
                  prefix={<PieChartOutlined />}
                  valueStyle={{ color: "#faad14" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Widgets */}
          <Row gutter={[16, 16]} className="mt-6">
            <Col xs={24} lg={16}>
              <Card title="Projects Overview" className="shadow-lg">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: "100%" }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Task Completion" className="shadow-lg">
                <p>Project A</p>
                <Progress percent={70} status="active" />
                <p className="mt-4">Project B</p>
                <Progress percent={50} status="active" />
                <p className="mt-4">Project C</p>
                <Progress percent={100} status="success" />
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row gutter={[16, 16]} className="mt-6">
            <Col xs={24} lg={12}>
              <Card title="Revenue Breakdown" className="shadow-lg">
                <Bar
                  data={barData}
                  xField="type"
                  yField="value"
                  color={["#1890ff", "#faad14", "#52c41a"]}
                  autoFit
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Booking Sources" className="shadow-lg">
                <Pie
                  data={pieData}
                  angleField="value"
                  colorField="type"
                  radius={1}
                  label={{ type: "outer", content: "{name}: {percentage}" }}
                  autoFit
                />
              </Card>
            </Col>
          </Row>

          {/* Line Chart */}
          <Row gutter={[16, 16]} className="mt-6">
            <Col xs={24}>
              <Card title="Monthly Revenue Trend" className="shadow-lg">
                <Line
                  data={lineData}
                  xField="date"
                  yField="revenue"
                  smooth
                  color="#1890ff"
                  autoFit
                />
              </Card>
            </Col>
          </Row>
        </div>
      }
    />
  );
};

export default Dashboard;
