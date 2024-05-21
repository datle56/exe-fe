import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import NewDashboard from '../examples/NewDashboard';

const NewDashboardForm = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        <div className="col" style={{ marginTop: '5%' }}>
          <Card className="shadow border-0" style={{ minHeight: '800px', borderRadius: '20px' }}>
              <NewDashboard />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default NewDashboardForm;