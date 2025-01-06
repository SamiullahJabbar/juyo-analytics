import React from 'react';
import { Layout, Card, Row, Col, Typography, Progress, List, Avatar } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AppLayout from '../../components/Layout/AppLayout';

const { Title, Text } = Typography;
const { Content } = Layout;

const data = [
  { name: 'Mon', visitors: 500, views: 400 },
  { name: 'Tue', visitors: 700, views: 600 },
  { name: 'Wed', visitors: 600, views: 800 },
  { name: 'Thu', visitors: 800, views: 900 },
  { name: 'Fri', visitors: 1000, views: 700 },
  { name: 'Sat', visitors: 1200, views: 780 },
  { name: 'Sun', visitors: 1500, views: 820 },
];

const pieData = [
  { name: 'Mobile', value: 55 },
  { name: 'Desktop', value: 35 },
  { name: 'Tablet', value: 10 },
];

const discussions = [
  {
    title: 'Adriana commented on your product',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    title: 'Constantin joined your team',
    avatar: 'https://via.placeholder.com/40',
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function AnalyticsDashboard() {

  return (
    <AppLayout  Children={

      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <Title level={2} style={{ marginBottom: '16px' }}>
          Analytics Dashboard
        </Title>

        {/* Metric Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>Users Pluggins</Title>
              <Text>2.5k</Text>
              <Progress percent={200} status="active" />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>Widgets</Title>
              <Text>250</Text>
              <Progress percent={180} strokeColor="green" />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>Revinews</Title>
              <Text>166</Text>
              <Progress percent={16} strokeColor="red" />
            </Card>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Title level={4}>Users by Devices</Title>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Title level={4}>Page Views</Title>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Title level={4}>Visitors</Title>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Discussions and Referrals */}
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} sm={12}>
            <Card title="Discussions">
              <List
                itemLayout="horizontal"
                dataSource={discussions}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href="#">{item.title}</a>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card title="Top Referrals">
              <List
                dataSource={['Google.com', 'YouTube.com', 'Facebook.com']}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={item} />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
} />
  );
}
