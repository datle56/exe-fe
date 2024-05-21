import React, { useState } from "react";
import { Button, Col, Row, Input, Space, Checkbox, message } from "antd";
import { HomeOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Image } from "antd";
import { Link } from "react-router-dom";

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
              background: "#27ae60",
              width: "6rem",
               // height: "1rem",
              padding: "0.5rem",
              fontSize: "1em",
              display: "flex",
              color: "#ecf0f1",
              gap: "0.5rem",
              alignItems: "center",
              textAlign: "center",  
            }}
          >
            <Link to="/home">
              <HomeOutlined style={{marginRight:'0.5rem'}}/>
              Home
            </Link>         
          </Button>
          <div className="title" style={{marginTop:"2rem"}}>
            <p
              style={{
                fontSize: "2rem",
              }}
            >
              Sign in to <b>Speak</b>
            </p>
            <p>Welome to SPEAK</p>
          </div>
          <div className="email-password-input" style={{marginTop:"2rem"}}>
            <Space direction="vertical" style={{width:"100%"}}>
              <Input 
                placeholder="Email" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{marginTop: "1rem"}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Space>
          </div>
          <div className="input-list-check-link" style={{marginTop: "1rem"}}>
            <div className="checkbox-and-link-forget-password" style={
              {display:'flex',
              direction: 'row', 
              justifyContent: 'space-between'}}
              >
              <Checkbox>Remember me</Checkbox>
              <a style={linkStyle}>Forgot password</a>
            </div>
            <Button 
              style={{ width: "100%", background: "#2ecc71", marginTop: "1rem" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>

          <div className='link-sign-tup-login-tutor' style={{marginTop: "2rem"}}>
            <Link to="/register" style={{...linkStyle, marginRight: "4rem"}}>
              Or Sign Up
            </Link>
            
          </div>
        </Col>

        <Col span={12} style={{ padding: "6rem", width: "110%" }}>
          <Image src="https://www.shutterstock.com/image-vector/man-key-near-computer-account-260nw-1499141258.jpg" />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
