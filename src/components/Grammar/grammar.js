import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import { Button, Input, Select, Space } from 'antd';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spin } from 'antd';
function Grammar() {
    const [socket, setSocket] = useState(null);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState(null);
    const [mode, setMode] = useState('1');

    useEffect(() => {
        // Xóa kết nối WebSocket cũ nếu tồn tại
        if (socket) {
            socket.close();
        }

        // Tạo kết nối WebSocket mới
        const newSocket = new WebSocket(`wss://speak.id.vn/api/grammar/${mode}`);
        setSocket(newSocket);

        // Xử lý sự kiện nhận thông điệp mới từ kết nối WebSocket mới
        newSocket.onmessage = function (event) {
            setMessage({ __html: event.data });
        };

        // Cleanup: Đóng kết nối WebSocket khi component unmount hoặc mode thay đổi
        return () => {
            if (newSocket) {
                newSocket.close();
            }
        };
    }, [mode]);

    const sendMessage = () => {
        if (socket) {
            socket.send(input);
            setInput('');
        }
    };

    const changeMode = (value) => {
        setMode(value);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ height: 500, width: '50%', margin: 5, overflow: 'auto', borderRight: "1px solid black" }}>
                <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='Write something here' style={{ width: "100%", height: "90%", border: "0px", }}></textarea>
                <Row>
                    <Col md={9} style={{ display: "flex", justifyContent: "end" }}>
                        <Button onClick={sendMessage} type="primary">Submit</Button>
                    </Col>
                    <Col style={{ padding: "0px" }} md={3}>
                        <Select
                            defaultValue={mode}
                            style={{ width: 120 }}
                            onChange={changeMode}
                            options={[
                                {
                                    value: '1',
                                    label: 'Advance',
                                },
                                {
                                    value: '2',
                                    label: 'Normal',
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </div>
            <div style={{ height: 500, width: '50%', margin: 5, overflow: 'auto' }}>
                {message && <div dangerouslySetInnerHTML={message}></div>}
            </div>
        </div>
    );
}

export default Grammar;
