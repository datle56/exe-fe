import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import AdminPayment from 'components/Payment/adminPayment';

const AdminPaymentForm = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
          <Card className="shadow border-0" style={{ minHeight: '500px' }}>
              <AdminPayment />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminPaymentForm;