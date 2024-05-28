import React, { useState } from "react";
import { Button, Col, Row, Input, Space, Checkbox, message, Image } from "antd";
import { HomeOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const linkStyle = {
  textDecoration: "underline",
  color: "#bdc3c7"
};

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        message.success("Login successful");

        // Save token
        localStorage.setItem('token', data.access_token);

        // Redirect
        if (data.role === "user") {
          window.location.href = "/user/home";
        } else if (data.role === "tutor") {
          window.location.href = "/tutor/home";
        }
      } else {
        message.error("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("An error occurred during login");
    }
  };

  return (
    <div>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "4rem",
          }}
        >
          <Button
            className="home-button"
            style={{
              background: "#6b8f73",
              width: "6rem",
              padding: "0.5rem",
              fontSize: "1em",
              display: "flex",
              color: "#ecf0f1",
              gap: "0.5rem",
              alignItems: "center",
              textAlign: "center",
              paddingLeft: "12px",
            }}
          >
            <Link to="/home">
              <HomeOutlined style={{ marginRight: '0.5rem' }} />
              Home
            </Link>
          </Button>
          <div className="title" style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "2rem" }}>
              Sign in to <b>Speak</b>
            </p>
            <p>Welcome to SPEAK</p>
          </div>
          <div className="email-password-input" style={{ marginTop: "2rem" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input.Password
                placeholder="Password"
                iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                style={{ marginTop: "1rem" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Space>
          </div>
          <div className="input-list-check-link" style={{ marginTop: "1rem" }}>
            <div className="checkbox-and-link-forget-password" style={{
              display: 'flex',
              direction: 'row',
              justifyContent: 'space-between'
            }}>
              <Checkbox>Remember me</Checkbox>
              <a style={linkStyle} href="/forgot-password">Forgot password</a>
            </div>
            <Button
              style={{ width: "100%", background: "#2ecc71", marginTop: "1rem" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
          <div className='link-sign-tup-login-tutor' style={{ marginTop: "2rem" }}>
            <Link to="/register" style={{ ...linkStyle, marginRight: "4rem" }}>
              Or Sign Up
            </Link>
          </div>
        </Col>

        <Col span={12} style={{ padding: "6rem", width: "110%" }}>
          <Image src="https://www.shutterstock.com/image-vector/man-key-near-computer-account-260nw-1499141258.jpg" />
        </Col>
      </Row>
      <div className="footer1"
        style={{ width: "100%", height: "17rem", backgroundColor: "#44624a", color: "white" }}>
        <Row>
          <Col md={6}>
            <Row style={{ margin: "10% 5% 5% 5%" }}>
              <Col md={8}>
                <Row>ABOUT US</Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Mission & Vision
                  </NavLink>
                </Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Our Company
                  </NavLink>
                </Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Our Projects
                  </NavLink>
                </Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Our Team
                  </NavLink>
                </Row>
              </Col>
              <Col md={8}>
                <Row>DISCOVER</Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Projects & Research
                  </NavLink>
                </Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Clients Review
                  </NavLink>
                </Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Our Projects
                  </NavLink>
                </Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Our Team
                  </NavLink>
                </Row>
              </Col>
              <Col md={8}>
                <Row>USEFUL LINKS</Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Contact Us
                  </NavLink>
                </Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Terms & Conditions
                  </NavLink>
                </Row>
                <Row>
                  <NavLink style={{ color: "white", margin: "1rem 0 0 0 " }} to="/">
                    Review
                  </NavLink>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row style={{ margin: "5% 5% 5% 5%" }}>
              <Col style={{ borderRight: "1px solid black" }} md={4}>
                SPEAK
              </Col>
              <Col style={{ marginLeft: "1rem" }} md={20}>
                Seize Potential, Enhance & Acquire Knowledge
              </Col>
            </Row>
            <Row style={{ margin: "5% 5% 5% 5%", justifyContent: "start" }}>
              Subscribe to get our Newsletter
            </Row>
            <Row style={{ margin: "5% 5% 5% 5%" }}>
              <form>
                <Row>
                  <Col span={16}>
                    <Input type="email" placeholder="Enter email" />
                    <p style={{ color: "white" }}>
                      We'll never share your email with anyone else.
                    </p>
                  </Col>
                  <Col span={8}>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
