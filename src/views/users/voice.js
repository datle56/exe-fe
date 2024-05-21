import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import App from 'components/test voice/App.js';
import ReactDOM from 'react-dom/client';

const VoiceForm = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        <div className="col" style={{ marginTop: '5%' }}>
          <Card className="shadow border-0" style={{ minHeight: '500px', borderRadius: '20px' }}>
              <App />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default VoiceForm;

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
