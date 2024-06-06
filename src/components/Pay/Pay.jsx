import React, { useEffect, useState } from 'react';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const packages = {
    1: { packageName: 'BASIC LEARNING PACK', price: 39000 },
    2: { packageName: 'PRO LEARNING PACK', price: 89000 },
    3: { packageName: 'BASIC AI PACK', price: 49000 },
    4: { packageName: 'PRO AI PACK', price: 99000 }
};

const Pay = () => {
    const location = useLocation();
    const { packageId } = location.state || {};
    const selectedPackage = packages[packageId];
    const [confirmationSent, setConfirmationSent] = useState(false);

    // Thêm decode token và state cho username
    const [username, setUsername] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
        }
    }, []);

    if (!selectedPackage) {
        return <div>Gói không hợp lệ, vui lòng chọn lại gói.</div>;
    }

    const handleConfirmation = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://speak.id.vn/api/buy-packed?package_id=${packageId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({}) // Dữ liệu trống
        });
        const data = await response.json();
        // Xử lý phản hồi từ server nếu cần
        console.log(data);
        setConfirmationSent(true); // Đánh dấu là đã gửi xác nhận thành công
    };
  

    return (
        <Container>
            <Card>
                <Row style={{ marginTop: "5%" }}>
                    <Col style={{ display: "flex", justifyContent: "flex-end"}} md={2}><HiOutlineLightBulb /></Col>
                    <Col md={10}>Mở App Ngân hàng bất kỳ để quét mã VietQR hoặc chuyển khoản chính xác số tiền, nội dung bên dưới</Col>
                </Row>

                <div style={{ display: "flex", marginTop: "5%" }}>
                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ display: "flex" }}>VIETQRPRO</div>
                        <div style={{ height: "250px", width: "250px" }} className="imgQR" ></div>
                    </Col>

                    <Col>
                        <Row >
                            <Col md={1} style={{ height:"45px", borderRadius:"50%" }} className="bankicon"></Col>
                            <Col md={11} style={{ display: 'flex', flexDirection: "column" }}>
                                <span>Ngân hàng</span>
                                <h3>Ngân hàng TMCP Quân Đội</h3>
                            </Col>
                        </Row>
                        <div>
                            <span>Chủ tài khoản:</span>
                            <h3>NGUYEN THANH DAT</h3>
                        </div>
                        <Row>
                            <Col>
                                <span>Số tài khoản:</span>
                                <h3>7470102050000</h3>
                            </Col>
                            <Col style={{display: "flex", alignItems: "center"}}>
                                <CopyToClipboard text="7470102050000">
                                    <button>Sao chép</button>
                                </CopyToClipboard></Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>Số tiền:</span>
                                <h3>{selectedPackage.price} vnđ</h3>
                            </Col>
                            <Col style={{display: "flex", alignItems: "center"}}>
                                <CopyToClipboard text={`${selectedPackage.price} vnđ`}>
                                    <button>Sao chép</button>
                                </CopyToClipboard></Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>Nội dung:</span>
                                <h3>{username} {packageId} nap point</h3> {/* Sửa thành packageId */}
                            </Col>
                            <Col style={{display: "flex", alignItems: "center"}}>
                                <CopyToClipboard text={`${username} ${packageId} nap point`}>
                                    <button>Sao chép</button>
                                </CopyToClipboard></Col>
                        </Row>
                    </Col>
                </div>
                <div style={{ display: "flex", marginTop:"3%", marginBottom: "2%" }}>
                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}} className='huybutton'>
                        <button>Hủy</button>
                    </Col>
                    <Col>
                        <span>Lưu ý: Nhập chính xác số tiền {selectedPackage.price}, nội dung {selectedPackage.packageName} nap point khi chuyển khoản</span>
                    </Col>
                </div>
                {/* Thêm nút xác nhận */}
                <div style={{ display: "flex", marginTop:"3%", marginBottom: "2%" }}>
                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}} className='xacnhanbutton'>
                        {/* Sử dụng state để kiểm tra xem đã gửi xác nhận hay chưa */}
                        {!confirmationSent ? (
                            <Button onClick={handleConfirmation}>Xác nhận</Button>
                        ) : (
                            <span>Đã gửi xác nhận</span>
                        )}
                    </Col>
                </div>
            </Card>
        </Container>
    );
};

export default Pay;
