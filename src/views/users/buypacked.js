import React from "react";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import Buypackage from 'components/Packed/user.js';

const BuypackageForm = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col" style={{ marginTop: '5%' }}>
            <Card className="shadow border-0" style={{ minHeight: '750px', borderRadius: '20px' }}>
              <Buypackage />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BuypackageForm;
