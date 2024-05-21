import React from "react";
import { Button, Col, Row, Input, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { Image } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Select } from 'antd';
import { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from "react-router-dom";


const linkStyle = {
  textDecoration: "underline",
  color: "#bdc3c7"
}

const { Option } = Select;
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState();
  
  let navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, email, password, role }),
      });
  
      if (response.ok) {
        message.success("Registration successful");
        navigate("/login");
      } else {
        const data = await response.json();
        if (data.detail === "Username already exists") {
          message.error("Username already exists");
        } else {
          message.error("Registration failed");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      message.error("An error occurred during registration");
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
              Register account
            </p>
            <p>Welcome to SPEAK</p>
          </div>
          <div className="email-password-input" style={{marginTop:"2rem"}}>
            <Space direction="vertical" style={{width:"100%"}}>
              <Input 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input.Password
                placeholder="Confirm password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Select 
                placeholder="Select a role"
                value={role}
                onChange={(value) => setRole(value)}
              >
                <Option value="user">User</Option>
                <Option value="tutor">Tutor</Option>
              </Select>
            </Space>
          </div>
          <Button 
            style={{ width: "100%", background: "#2ecc71", marginTop: "1rem" }}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <div className='link-sign-tup-login-tutor' style={{marginTop: "2rem"}}>
            <Link to="/" style={{...linkStyle, marginRight: "4rem"}}>
              Or Login
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

export default Register;
