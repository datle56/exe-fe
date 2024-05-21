import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import uploadCV from 'components/CV/uploadCV.js';

const uploadCVForm = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
          <Card className="shadow border-0" style={{ minHeight: '500px' }}>
              <uploadCV />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default uploadCVForm;