import {
  Button,
  Checkbox,
  Form,
  Grid,
  Input,
  theme,
  Typography,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login, LoginData } from "../../api/auth";
import { LoginApiResponse } from "../../types";
import { toast } from "react-toastify";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    navigate("/");
  }

  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = async (values: LoginData) => {
    console.log("Received values of form: ", values);
    try {
      const resp = await login(values);
      const data: LoginApiResponse = resp.data;
      if (data.status === "success") {
        localStorage.setItem("token", data.data.token);
        navigate("/");
      } else if (data.status === "error") {
        console.error(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1890FF, #91D5FF)",
      padding: "1rem",
    },
    card: {
      display: "grid",
      gridTemplateColumns: screens.sm ? "1fr 1fr" : "1fr",
      maxWidth: "960px",
      width: "100%",
      borderRadius: "12px",
      backgroundColor: "#fff",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    },
    image: {
      backgroundImage: "url('/Hotel.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: screens.sm ? "block" : "none",
    },
    formContainer: {
      padding: "3rem",
    },
    header: {
      marginBottom: "2rem",
      textAlign: "center",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    text: {
      color: "#6c757d",
      fontSize: "1rem",
    },
    input: {
      height: "48px",
      borderRadius: "6px",
    },
    button: {
      height: "48px",
      fontSize: "16px",
      borderRadius: "6px",
    },
    footer: {
      marginTop: "1rem",
      textAlign: "center",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.image}></div>
        <div style={styles.formContainer}>
          <div style={styles.header}>
            <Title style={styles.title}>Sign in</Title>
            <Text style={styles.text}>
              Welcome back! Please enter your details below to sign in.
            </Text>
          </div>
          <Form
            name="login_form"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input a valid email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                style={styles.input}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                style={styles.input}
              />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={styles.button}
              >
                Log in
              </Button>
              <div style={styles.footer}>
                <Text>Don’t have an account?</Text>{" "}
                <Link href="/signup">Sign up now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
