import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import TutorMeet from 'components/Meeting/tutormeet.js';

const MeetingForm = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        <div className="col" style={{ marginTop: '5%' }}>
          <Card className="shadow border-0" style={{ minHeight: '500px', borderRadius: '20px' }}>
              <TutorMeet />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default MeetingForm;