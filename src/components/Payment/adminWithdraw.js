import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Select, Space } from 'antd';
function AdminWidthdraw() {
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState('all');

    const handleChange = (value) => {
        setFilter(value);
    };

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/admin/tutor/payments');
            console.log(response.data)
            setPayments(response.data.payments);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(123)
    const handleStatusChange = async (paymentId, status) => {
        try {
            await axios.put(`http://localhost:8000/admin/tutor/payment/${paymentId}`, null, {
                params: {
                    status: status
                }
            });
            fetchPayments(); // Fetch payments again after a status is updated
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPayments(); // Fetch payments when the component is mounted
    }, []);

    return (
        <div>
            <h2>Quản lý rút tiền</h2>
            <label>
                Lọc trạng thái:
                {/* <select value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="all">Tất cả</option>
                    <option value="waiting">Đang chờ</option>
                    <option value="accept">Đã chấp nhận</option>
                    <option value="decline">Đã từ chối</option>
                </select> */}
                <Select
                    defaultValue={filter}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'waiting', label: 'Đang chờ' },
                        { value: 'accept', label: 'Đã chấp nhận' },
                        { value: 'decline', label: 'Đã từ chối' },
                    ]}
                />
            </label>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Người dùng</th>
                        <th>Số tiền</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.filter(payment => filter === 'all' || payment.status === filter).map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.username}</td>
                            <td>{payment.amount}</td>
                            <td>{new Date(payment.timestamp).toLocaleString()}</td>
                            <td style={{ color: payment.status === 'accept' ? '#8bc34a' : payment.status === 'decline' ? '#f44336' : '#FF6600' }}>{payment.status}</td>
                            <td>
                                {payment.status === 'waiting' && (
                                    <>
                                        <Button variant="success" onClick={() => handleStatusChange(payment.id, 'accept')} >Chấp nhận</Button>
                                        <Button variant="danger" onClick={() => handleStatusChange(payment.id, 'decline')}>Từ chối</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminWidthdraw;
