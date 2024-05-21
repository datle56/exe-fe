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
    const [mode, setMode] = useState('ws');

    useEffect(() => {
        const newSocket = new WebSocket(`ws://localhost:8000/ws${mode}grammar`);
        setSocket(newSocket);
    
        newSocket.onmessage = function (event) {
            setMessage({ __html: event.data });
        };
    
        return () => {
            newSocket.close();
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
                {/* <input type="text" value={input} onChange={e => setInput(e.target.value)} /> */}
                {/* <Button variant="primary" onClick={sendMessage}>Send</Button> */}
                {/* <select variant="primary" value={mode} onChange={changeMode}>
                    <option value="ws">Friendly</option>
                    <option value="ws2">Normal</option>
                </select> */}
                {/* <Row>
                    <Col style={{ paddingRight: "0px" }} md={6}>
                        <Space.Compact
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input value={input} onChange={e => setInput(e.target.value)} defaultValue="Combine input and button" />
                            <Button onClick={sendMessage} type="primary">Submit</Button>
                        </Space.Compact>
                    </Col>
                    <Col style={{ padding: "0px" }} md={1}>
                        <Space wrap>
                            <Select
                                defaultValue={mode}
                                style={{
                                    width: 120,
                                }}
                                onChange={changeMode}
                                options={[
                                    {
                                        value: 'ws',
                                        label: 'Friendly',
                                    },
                                    {
                                        value: 'ws2',
                                        label: 'Normal',
                                    }
                                ]}
                            />
                        </Space>
                    </Col>
                </Row> */}
                <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='Write something here' style={{ width: "100%", height: "90%", border: "0px", }}></textarea>
                <Row >
                    <Col md={9} style={{ display: "flex", justifyContent: "end" }}>
                        <Button onClick={sendMessage} type="primary">Submit</Button>
                    </Col>
                    <Col style={{ padding: "0px" }} md={3}>
                        <Space wrap>
                            <Select
                                defaultValue={mode}
                                style={{
                                    width: 120,
                                }}
                                onChange={changeMode}
                                options={[
                                    {
                                        value: 'ws',
                                        label: 'Friendly',
                                    },
                                    {
                                        value: 'ws2',
                                        label: 'Normal',
                                    }
                                ]}
                            />
                        </Space>
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
