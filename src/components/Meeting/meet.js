import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import { Button, Input, Space, Checkbox, message } from "antd";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Col, Row } from 'antd';
import Button from 'react-bootstrap/Button';
import PaymentProfileCard from '../ProfileCard/PaymentProfileCard';
import QuickStart from 'components/ProfileCard/QuickStart';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Image } from 'antd';

import CardProfile from "../CardProfile/CardProfile.jsx"


function Meet() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState(null); // Define ws here

  const cancelConnection = () => {
    setLoading(false);
    ws.close(); // Close the WebSocket connection
    ws.send(JSON.stringify({ action: 'cancel' }));
  }

  const startConnection = () => {
    setLoading(true);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;
    const role = decodedToken.role;

    setUsername(username);
    setRole(role);
    console.log(username)
    const ws = new WebSocket(`ws://https://speak.id.vn/api/ws/${username}/${role}`);
    setWs(ws); // Update ws here

    ws.onopen = () => {
      console.log('WebSocket is connected');
      ws.send(JSON.stringify({ token }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.redirect_url) {
        window.location.href = response.redirect_url;
        setLoading(false); // Kết thúc hiệu ứng loading khi chuyển hướng
      }
      if (response.message) {
        setMessage(response.message);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket is closed');
    };

    return () => {
      ws.close();
    };
  };

  return (
    <div>
      <style jsx>{`
        .loader {
          border: 16px solid #f3f3f3;
          border-radius: 50%;
          border-top: 16px solid #3498db;
          width: 120px;
          height: 120px;
          -webkit-animation: spin 2s linear infinite;
          animation: spin 2s linear infinite;
        }

        @-webkit-keyframes spin {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <Row >
        <Col span={18} style={{ justifyContent: "center", top: "10rem", display: "flex" }} >
          <div>
            {!loading && <Button variant="outline-primary" onClick={startConnection}>Start</Button>}
            {loading &&
              <>
                <Row style={{ marginBottom: "1rem" }} className="loader"></Row>
                <Row style={{ marginBottom: "1rem" }}>We are connecting a tutor for you </Row>
                <Button style={{ position: "absolute" }} onClick={cancelConnection} variant="outline-danger">Cancel</Button>{' '}
              </>
            }
          </div>
        </Col>
        {/* <PaymentProfileCard
            avatar="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
            name="Annie Leonchart"
            email="annie_leonchart@mail.com"
            lessons={24}
            credits="$1"
          />
          <QuickStart /> */}
        {/* <Col span={4} style={{ display: "flex", flexDirection: 'column' }}>


          <div style={{ backgroundColor: "#dce2ee", borderRadius: "5%" }}>
            <Row style={{ justifyContent: "center" }}>  <Avatar style={{ backgroundColor: "blueviolet" }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" size={64} icon={<UserOutlined />} /></Row>
            <div style={{ height: "7rem", color: "black" }}>
              <Row style={{ justifyContent: "center" }}>Minh la ...</Row>
              <Row style={{ justifyContent: "center" }}>hello12345@gmail.conm</Row>
              <Row style={{ justifyContent: "space-around" }}>
                <Col style={{ justifyContent: "center" }}>
                  <Row style={{ justifyContent: "center" }}>
                    Lessons
                  </Row>
                  <Row style={{ justifyContent: "center" }}>
                    24
                  </Row>
                </Col>
                <Col>
                  <Row style={{ justifyContent: "center" }}>
                    Credits
                  </Row>
                  <Row style={{ justifyContent: "center" }}>
                    1$
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          <div >
            <Row><h1>Quick Start</h1></Row>
            <Row style={{ backgroundColor: "#f0f0f0", height: "5rem", borderRadius: "5%", marginBottom: "4%" }}>
              <Col style={{ margin: "5%" }}>
                <img style={{ borderRadius: "5%", width: "50px", height: "50px" }} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" >
                </img>
              </Col>
              <Col style={{ justifyContent: "center", display: "flex", flexDirection: "column", color: "black" }}>
                <Row>Taking now</Row>
                <Row>30 minute</Row>
              </Col>
            </Row>
            <Row style={{ backgroundColor: "#f0f0f0", height: "5rem", borderRadius: "5%", marginBottom: "4%", color: "black" }}>
              <Col style={{ margin: "5%" }}>
                <img style={{ borderRadius: "5%", width: "50px", height: "50px" }} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" >
                </img>
              </Col>
              <Col style={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
                <Row>Taking now</Row>
                <Row>30 minute</Row>
              </Col>
            </Row>
            <Row style={{ backgroundColor: "#f0f0f0", height: "5rem", borderRadius: "5%", marginBottom: "4%", color: "black" }}>
              <Col style={{ margin: "5%" }}>
                <img style={{ borderRadius: "5%", width: "50px", height: "50px" }} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" >
                </img>
              </Col>
              <Col style={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
                <Row>Taking now</Row>
                <Row>30 minute</Row>
              </Col>
            </Row>


          </div>
        </Col> */}
      </Row>
    </div>

  );
}

export default Meet;


