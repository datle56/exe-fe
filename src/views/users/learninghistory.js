import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import UserMeetings from 'components/LearningHistory/user.js';

const LearningHistoryFrom = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        <div className="col" style={{ marginTop: '5%' }}>
          <Card className="shadow border-0" style={{ minHeight: '750px', borderRadius: '20px' }}>
              <UserMeetings />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default LearningHistoryFrom;