import React from 'react';
import { Layout, Card, Row, Col, Typography, Progress, List, Avatar } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AppLayout from '../../components/Layout/AppLayout';
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/grid/gridSlice"; 
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
  const darkMode = useSelector(selectDarkMode); // Get darkMode state

  const darkModeStyles = {
    background: darkMode ? '#0f172a' : '#f0f2f5',
    color: darkMode ? '#ffffff' : '#000000',
    cardBackground: darkMode ? '#0f172a' : '#ffffff',
    cardBorderColor: darkMode ? '#3a3a3a' : '#d9d9d9',
    progressBg: darkMode ? '#444' : '#e9e9e9',
  };

  return (
    <AppLayout
      Children={
        <Layout style={{ minHeight: '100vh', background: darkModeStyles.background }}>
          <Content style={{ padding: '24px' }}>
            <Title level={2} style={{ marginBottom: '16px', color: darkModeStyles.color }}>
              Analytics Dashboard
            </Title>

            {/* Metric Cards */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Card style={{ background: darkModeStyles.cardBackground, borderColor: darkModeStyles.cardBorderColor }}>
                  <Title level={4} style={{ color: darkModeStyles.color }}>Users Plugins</Title>
                  <Text style={{ color: darkModeStyles.color }}>2.5k</Text>
                  <Progress
                    percent={200}
                    status="active"
                    strokeColor={darkMode ? '#8884d8' : undefined}
                    trailColor={darkModeStyles.progressBg}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card style={{ background: darkModeStyles.cardBackground, borderColor: darkModeStyles.cardBorderColor }}>
                  <Title level={4} style={{ color: darkModeStyles.color }}>Widgets</Title>
                  <Text style={{ color: darkModeStyles.color }}>250</Text>
                  <Progress
                    percent={180}
                    strokeColor="green"
                    trailColor={darkModeStyles.progressBg}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card style={{ background: darkModeStyles.cardBackground, borderColor: darkModeStyles.cardBorderColor }}>
                  <Title level={4} style={{ color: darkModeStyles.color }}>Revinews</Title>
                  <Text style={{ color: darkModeStyles.color }}>166</Text>
                  <Progress
                    percent={16}
                    strokeColor="red"
                    trailColor={darkModeStyles.progressBg}
                  />
                </Card>
              </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={24} sm={12} md={8}>
                <Card style={{ background: darkModeStyles.cardBackground, borderColor: darkModeStyles.cardBorderColor }}>
                  <Title level={4} style={{ color: darkModeStyles.color }}>Users by Devices</Title>
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
                <Card style={{ background: darkModeStyles.cardBackground, borderColor: darkModeStyles.cardBorderColor }}>
                  <Title level={4} style={{ color: darkModeStyles.color }}>Page Views</Title>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                      <XAxis dataKey="name" stroke={darkModeStyles.color} />
                      <YAxis stroke={darkModeStyles.color} />
                      <Tooltip />
                      <Bar dataKey="views" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card style={{ background: darkModeStyles.cardBackground, borderColor: darkModeStyles.cardBorderColor }}>
                  <Title level={4} style={{ color: darkModeStyles.color }}>Visitors</Title>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                      <XAxis dataKey="name" stroke={darkModeStyles.color} />
                      <YAxis stroke={darkModeStyles.color} />
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
                <Card
                  title="Discussions"
                  style={{ background: darkModeStyles.cardBackground, borderColor: darkModeStyles.cardBorderColor }}
                  headStyle={{ color: darkModeStyles.color }}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={discussions}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<a href="#" style={{ color: darkModeStyles.color }}>{item.title}</a>}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12}>
                <Card
                  title="Top Referrals"
                  style={{ background: darkModeStyles.cardBackground, borderColor: darkModeStyles.cardBorderColor }}
                  headStyle={{ color: darkModeStyles.color }}
                >
                  <List
                    dataSource={['Google.com', 'YouTube.com', 'Facebook.com']}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta title={<span style={{ color: darkModeStyles.color }}>{item}</span>} />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      }
    />
  );
}
