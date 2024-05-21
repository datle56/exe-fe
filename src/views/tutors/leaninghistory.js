import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import TutorMeetings from 'components/LearningHistory/tutor.js';

const TutorLearningHistoryFrom = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        <div className="col" style={{ marginTop: '5%' }}>
          <Card className="shadow border-0" style={{ minHeight: '500px', borderRadius: '20px' }}>
              <TutorMeetings />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default TutorLearningHistoryFrom;