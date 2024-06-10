import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Col, Row } from 'antd';
import Button from 'react-bootstrap/Button';

function Meet() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const [tutorStatus, setTutorStatus] = useState('');

  useEffect(() => {
    const checkTutorStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://speak.id.vn/api/tutor/checkstatus', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTutorStatus(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkTutorStatus();
  }, []);

  const cancelConnection = () => {
    setLoading(false);
    if (ws) {
      ws.send(JSON.stringify({ action: 'cancel' }));
      ws.close();
    }
  }

  const startConnection = () => {
    if (tutorStatus === 'accept') {
      setLoading(true);
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
      const role = decodedToken.role;
      setUsername(username);
      setRole(role);
      console.log(username);

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//speak.id.vn/api/ws/${role}/${username}`;
      const ws = new WebSocket(wsUrl);
      setWs(ws);

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
    } else {
      // Thêm các logic hiển thị upload CV và thông báo chờ duyệt tại đây
      setMessage('Tutor status is not accept. Please upload your CV and wait for approval.');
    }
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
      <Row>
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
            {message && <p>{message}</p>}
          </div>
        </Col>
      </Row>
    </div>

  );
}

export default Meet;
