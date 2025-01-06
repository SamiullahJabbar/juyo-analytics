import React from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  Typography,
  theme,
  Divider,
} from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Title, Text, Link } = Typography;

export default function HotelRevenueSignUp() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { username, email, password } = values;

    try {
      const res = await signup({ username, email, password });
      const data = await res.data;

      if (data.status === "success") {
        localStorage.setItem("token", data.data.token);
        toast.success("Welcome to Hotel Revenue!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const styles = {
    section: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${token.colorPrimary} 40%, ${token.colorPrimaryBg} 80%)`,
      padding: "40px",
    },
    container: {
      maxWidth: "450px",
      width: "100%",
      padding: "30px",
      background: "#ffffff",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      textAlign: "center",
    },
    logo: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px",
    },
    button: {
      marginTop: "20px",
      height: "45px",
      fontWeight: "600",
      background: token.colorPrimary,
      border: "none",
      color: "#fff",
    },
    footer: {
      marginTop: "25px",
    },
    textMuted: {
      color: "#8c8c8c",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="60" height="60" rx="15" fill={token.colorPrimary} />
            <path
              d="M40 8H54V22H40V8Z"
              fill="white"
            />
            <path
              d="M26 22H40V38H26V22Z"
              fill="white"
            />
            <path
              d="M8 30H28V54H8V30Z"
              fill="white"
            />
          </svg>
        </div>
        <Title level={3} style={{ color: token.colorText }}>
          Join Hotel Revenue
        </Title>
        <Text style={styles.textMuted}>
          Unlock insights to boost your hotel's revenue.
        </Text>
        <Divider />
        <Form
          name="signup_form"
          onFinish={onFinish}
          layout="vertical"
          style={{ textAlign: "left" }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please input your Username!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", required: true, message: "Please input a valid Email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your Password!" },
            ]}
            extra="Minimum 8 characters with a mix of letters and numbers."
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block style={styles.button}>
            Create Account
          </Button>
        </Form>
        <div style={styles.footer}>
          <Text>
            Already a member? <Link href="/">Sign In</Link>
          </Text>
        </div>
      </div>
    </section>
  );
}
