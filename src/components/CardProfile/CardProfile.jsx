import React from 'react';
import { Col, Row } from 'antd';
import { Avatar, Space, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const CardProfile = () => {
    return (
        <Col span={5} style={{ display: "flex", flexDirection: 'column', marginTop: "5%" }}>


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
                        <img style={{ borderRadius: "5%", width: "50px", height: "50px" }} src="https://png.pngtree.com/png-vector/20230131/ourmid/pngtree-graduation-bachelor-hat-illustration-png-image_6580811.png" alt="Talking Now" >
                        </img>
                    </Col>
                    <Col style={{ justifyContent: "center", display: "flex", flexDirection: "column", color: "black" }}>
                        <Row>Taking now</Row>
                        <Row>30 min</Row>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: "#f0f0f0", height: "5rem", borderRadius: "5%", marginBottom: "4%", color: "black" }}>
                    <Col style={{ margin: "5%" }}>
                        <img style={{ borderRadius: "5%", width: "50px", height: "50px" }} src="https://static.vecteezy.com/system/resources/previews/009/663/676/original/pencil-icon-transparent-free-png.png" alt="AI Pronounciation" >
                        </img>
                    </Col>
                    <Col style={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
                        <Row>AI Pronunciation</Row>
                        <Row>15 min</Row>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: "#f0f0f0", height: "5rem", borderRadius: "5%", marginBottom: "4%", color: "black" }}>
                    <Col style={{ margin: "5%" }}>
                        <img style={{ borderRadius: "5%", width: "50px", height: "50px" }} src="https://static.vecteezy.com/system/resources/previews/028/601/328/non_2x/folder-3d-rendering-icon-illustration-free-png.png" alt="Checking Grammar" >
                        </img>
                    </Col>
                    <Col style={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
                        <Row>Checking Grammar</Row>
                        <Row>30 min</Row>
                    </Col>
                </Row>


            </div>
        </Col>
    )
}


export default CardProfile