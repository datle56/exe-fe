import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaListCheck } from "react-icons/fa6";
import { FaMicrophoneLines } from "react-icons/fa6";
import { GiBookCover } from "react-icons/gi";
import { RiKakaoTalkFill } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Buypackage() {
    const navigate = useNavigate();

    const handleBuyClick = (packageId) => {
    navigate(`/payments/${packageId}`, { state: { packageId } });
};

    return (
        <Row style={{ marginLeft: "5%", marginRight: "5%", marginTop: "10%" }}>
            <Col md={3} style={{ padding: "0px", fontWeight: "bold" }}>
                <Card
                    bg={'Light'.toLowerCase()}
                    key={'Light'}
                    text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ 'Light': '18rem', height: "28rem", marginTop: "14%", boxShadow: "0 10px 10px rgba(0, 0, 0, 0.15)" }}
                    className="mb-2"
                >
                    <Card.Header style={{ justifyContent: "center", display: "flex", color: "#25d9f5" }}>BASIC LEARNING PACK</Card.Header>
                    <Card.Body style={{ backgroundColor: "white" }}>
                        <Card.Title style={{ justifyContent: "center", display: "flex", fontSize: "2.5rem" }}> $39 </Card.Title>
                        <Card.Text style={{ fontWeight: "bold" }}>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }} >
                                <Col md={1}><FaListCheck /></Col>
                                <Col>Grammar Checking</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><FaMicrophoneLines /></Col>
                                <Col>Pronounciation</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><GiBookCover /></Col>
                                <Col>1 time learning</Col>
                            </Row>
                        </Card.Text>
                        <Row style={{ marginTop: "5.2rem", display: "flex", justifyContent: "center" }}>
                            <Button variant="info" onClick={() => handleBuyClick(1)}>BUY</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} style={{ padding: "0px", fontWeight: "bold" }}>
                <Card
                    bg={'Success'.toLowerCase()}
                    key={'Success'}
                    text={'Success'.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ 'Success': '18rem', height: "34rem", boxShadow: "0 10px 10px rgba(0, 0, 0, 0.15)" }}
                    className="mb-2"
                >
                    <Card.Header style={{ backgroundColor: "#2dce89", display: "flex", justifyContent: "center" }}>PRO LEARNING PACK</Card.Header>
                    <Card.Body>
                        <Card.Title style={{ justifyContent: "center", display: "flex", fontSize: "3.5rem", color: "white" }}> $89 </Card.Title>
                        <Card.Text style={{ fontWeight: "bold", marginTop: "2.5rem" }}>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }} >
                                <Col md={1}><FaListCheck /></Col>
                                <Col>Grammar Checking</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><FaMicrophoneLines /></Col>
                                <Col>Pronounciation</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><GiBookCover /></Col>
                                <Col>10 times learning (+1 free)</Col>
                            </Row>
                        </Card.Text>
                        <Row style={{ marginTop: "5.4rem", display: "flex", justifyContent: "center" }}>
                            <Button style={{ backgroundColor: "white", color: "black" }} variant="info" onClick={() => handleBuyClick(2)}>BUY</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} style={{ padding: "0px", fontWeight: "bold" }}>
                <Card
                    bg={'Light'.toLowerCase()}
                    key={'Light'}
                    text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ 'Light': '18rem', height: "28rem", marginTop: "14%", boxShadow: "0 10px 10px rgba(0, 0, 0, 0.15)", backgroundColor: "black" }}
                    className="mb-2"
                >
                    <Card.Header style={{ justifyContent: "center", display: "flex", color: "#25d9f5" }}>BASIC AI PACK</Card.Header>
                    <Card.Body style={{ backgroundColor: "white" }}>
                        <Card.Title style={{ justifyContent: "center", display: "flex", fontSize: "2.5rem" }}> $49 </Card.Title>
                        <Card.Text style={{ fontWeight: "bold" }}>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }} >
                                <Col md={1}><FaListCheck /></Col>
                                <Col>Grammar Checking</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><FaMicrophoneLines /></Col>
                                <Col>Pronounciation</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><GiBookCover /></Col>
                                <Col>1 times learning</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><RiKakaoTalkFill /></Col>
                                <Col>Talking with AI</Col>
                            </Row>
                        </Card.Text>
                        <Row style={{ marginTop: "2.45rem", display: "flex", justifyContent: "center" }}>
                            <Button variant="info" onClick={() => handleBuyClick(3)}>BUY</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} style={{ padding: "0px", fontWeight: "bold" }}>
                <Card
                    bg={'Info'.toLowerCase()}
                    key={'Info'}
                    text={'Info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ 'Info': '18rem', height: "34rem", boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.15)" }}
                    className="mb-2"
                >
                    <Card.Header style={{ backgroundColor: "#11cdef", justifyContent: "center", display: "flex" }}>PRO AI PACK</Card.Header>
                    <Card.Body>
                        <Card.Title style={{ justifyContent: "center", display: "flex", fontSize: "3.5rem", color: "white" }}> $99 </Card.Title>
                        <Card.Text style={{ fontWeight: "bold", marginTop: "2.5rem" }}>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }} >
                                <Col md={1}><FaListCheck /></Col>
                                <Col>Grammar Checking</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><FaMicrophoneLines /></Col>
                                <Col>Pronounciation</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><GiBookCover /></Col>
                                <Col>10 times learning (+1 free)</Col>
                            </Row>
                            <Row style={{ marginBottom: "1rem", marginLeft: "8%" }}>
                                <Col md={1}><RiKakaoTalkFill /></Col>
                                <Col>Talking with AI</Col>
                            </Row>
                        </Card.Text>
                        <Row style={{ marginTop: "2.7rem", display: "flex", justifyContent: "center" }}>
                            <Button style={{ backgroundColor: "white", color: "black" }} variant="info" onClick={() => handleBuyClick(4)}>BUY</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Buypackage;