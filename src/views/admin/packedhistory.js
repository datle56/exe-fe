import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import AdminBuyPacked from 'components/Packed/admin.js';

const AdminBuyPackedForm = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
          <Card className="shadow border-0" style={{ minHeight: '500px' }}>
              <AdminBuyPacked />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminBuyPackedForm;