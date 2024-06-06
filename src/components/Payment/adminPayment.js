import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Select, Space } from 'antd';

function AdminPayment() {
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState('all');

    const handleChange = (value) => {
        setFilter(value);
    };

    const fetchPayments = async () => {
        try {
            const response = await axios.get('https://speak.id.vn/api/admin/payments');
            setPayments(response.data.payments);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = async (paymentId, status) => {
        try {
            await axios.put(`https://speak.id.vn/api/admin/payments/${paymentId}`, null, {
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
            <h2>Quản lý thanh toán</h2>
            <label>
                Lọc trạng thái:
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
            {/* <table>
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
                            <td>{payment.status}</td>
                            <td>
                                {payment.status === 'waiting' && (
                                    <>
                                        <button onClick={() => handleStatusChange(payment.id, 'accept')}>Chấp nhận</button>
                                        <button onClick={() => handleStatusChange(payment.id, 'decline')}>Từ chối</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
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
                        <tr key={index} >
                            <td>{payment.username}</td>
                            <td>{payment.amount}</td>
                            <td>{new Date(payment.timestamp).toLocaleString()}</td>
                            <td style={{ color: payment.status === 'accept' ? '#8bc34a' : payment.status === 'decline' ? '#f44336' : '#FF6600' }}>
                                {payment.status}</td>
                            <td>
                                {payment.status === 'waiting' && (
                                    <>
                                        <Button variant="success" onClick={() => handleStatusChange(payment.id, 'accept')} >Chấp nhận</Button>
                                        <Button variant="danger" onClick={() => handleStatusChange(payment.id, 'decline')} >Từ chối</Button>
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

export default AdminPayment;
