import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Row, Col, Card, Button } from 'react-bootstrap';




const sample = [
  { url: "https://titan.email/wp-content/uploads/2021/09/email-introduction.png", text: "SELF-INTRODUCE" },
  { url: "https://cdn.firstcry.com/education/2022/12/09111755/Learn-about-Weather.jpg", text: "WEATHER" },
  { url: "https://static.vecteezy.com/system/resources/previews/005/084/945/non_2x/big-family-with-three-generation-free-vector.jpg", text: "FAMILY & FRIENDS" },
  { url: "https://www.cvmaker.uk/static/43716d799aa73abfd36f848df81815f9/126f5/06_when-and-how-to-list-hobbies-and-interests_.png", text: "HOBBIES" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg", text: "FOOD" },
  { url: "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg", text: "TRAVEL" },
  { url: "https://stateentityprofile.ca.gov/Uploads/service-22-Find-a-Job.jpg", text: "WORK" },
  { url: "https://library.acropolis.org/wp-content/uploads/2022/04/Educationcc.jpeg", text: "EDUCATION" },
  { url: "https://compote.slate.com/images/721112a8-1fa9-4a48-8eeb-0c4f29e0d8f6.jpeg?crop=1554%2C1036%2Cx2%2Cy0", text: "MOVIES" },
  { url: "https://img.freepik.com/free-photo/texture-treble-clef-dark-background-isolated-generative-ai_169016-29581.jpg", text: "MUSIC" },
  { url: "https://cdn.firstcry.com/education/2022/11/25154201/Learn-Sport-Names-List-of-Sports-in-English.jpg", text: "SPORTS" },
  { url: "https://as2.ftcdn.net/v2/jpg/01/43/39/41/1000_F_143394150_GcZRscFG5k8yU0guOTp8AAvdiTFjHaIN.jpg", text: "HOLIDAYS" },
  { url: "https://miro.medium.com/v2/resize:fit:1156/1*VzexncB2H2chkgC87wcnAA.jpeg", text: "TECHNOLOGY" },
  { url: "https://www.voicesofyouth.org/sites/voy/files/images/2019-11/istockphoto-519616538-612x612_0.jpg", text: "ENVIRONMENT" },
  { url: "https://www.shutterstock.com/shutterstock/photos/1928997539/display_1500/stock-vector-breaking-news-template-with-d-red-and-blue-badge-breaking-news-text-on-dark-blue-with-earth-and-1928997539.jpg", text: "NEWS" },
  { url: "https://images.everydayhealth.com/images/healthy-living/about-us-hero-alt.jpg?sfvrsn=68592040_1", text: "HEALTH" },
  { url: "https://i.guim.co.uk/img/media/684c80ad06a245a3ed80395c92011069c606aaeb/0_0_5000_3000/master/5000.jpg?width=1200&quality=85&auto=format&fit=max&s=583b5dab624e5da703634f4d0347849e", text: "FASHION" },
  { url: "https://i.pinimg.com/474x/03/f2/d5/03f2d524332a8348b1e202bfd0981404.jpg", text: "CULTURE & CUSTOM" },
  { url: "https://onlinefreestudymaterial.files.wordpress.com/2017/05/life-skills.png?w=1200", text: "LIFE SKILLS" },
  { url: "https://img.freepik.com/free-vector/shopping-cart-with-bags-gifts-concept-illustration_114360-18775.jpg", text: "SHOPPING" },
];



function Meet() {
  const [topic, setTopic] = useState('');
  const [showCards, setShowCards] = useState(true);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState(null);

  const cancelConnection = () => {
    setLoading(false);
    setShowCards(true);
    if (ws) {
      ws.send(JSON.stringify({ action: 'cancel' }));
      ws.close();
    }
  }



  const startConnection = () => {
    setLoading(true);
    setShowCards(false);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;
    const role = decodedToken.role;

    setUsername(username);
    setRole(role);
    console.log(username);

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//speak.id.vn/api/ws/${username}/${role}/${topic}`;
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
  };
  useEffect(() => {
    if (topic) {
      startConnection();
    }
  }, [topic]);
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
        <Col style={{ justifyContent: "center", top: "1rem", display: "flex" }} >
          <div>
            <div>
              {showCards && (
                <div>
                  <Row style={{ marginTop: "5%" }}>
                    <Col style={{ display: "flex", justifyContent: "flex-end" }} md={1}></Col>
                    <Col md={11} style={{ display: "flex", justifyContent: "flex-start", fontWeight: "bold", fontSize: "1.5rem", color: "black" }}>
                      Choose topic to start learning
                    </Col>
                  </Row>
                  <Row style={{ marginLeft: "5%", marginRight: "5%", marginTop: "2%" }}>
                    {sample.map((item, index) => (
                      <Col key={index} md={2} sm={3} xs={6} style={{ padding: "0px", fontWeight: "bold", marginRight: "3%" }}>
                        <Card
                          bg={'Light'.toLowerCase()}
                          text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
                          style={{ width: "auto", height: "auto", marginTop: "10%", boxShadow: "0 10px 10px rgba(0, 0, 0, 0.15)", borderRadius: "10%" }}
                          className="mb-2"
                        >
                          <Card.Body style={{
                            backgroundImage: `url(${item.url})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            borderRadius: "10%"
                          }}>
                            <Row style={{ marginTop: "80%", display: "flex", justifyContent: "center", opacity: "0.8" }}>
                              {!loading && <Button style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }} onClick={() => { setTopic(item.text); startConnection(); }}>{item.text}</Button>}
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
              {loading && (
                 <div style={{ marginTop: "5%" }}>
                  <Row style={{ marginBottom: "1rem" }} className="loader"></Row>
                  <Row style={{ marginBottom: "1rem" }}>We are connecting a tutor for you</Row>
                  <Button style={{ position: "absolute" }} onClick={cancelConnection} variant="outline-danger">Cancel</Button>
                </div>
              )}
            </div>
          </div>
        </Col>

      </Row>
    </div>

  );
}

export default Meet;


