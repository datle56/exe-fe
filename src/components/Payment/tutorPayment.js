import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function TutorWithdraw() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://speak.id.vn/api/tutor/payments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data.payments);  // Log the payments data

            setPayments(response.data.payments);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://speak.id.vn/api/tutor/withdraw', {
                amount: amount
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage(response.data.message);
            fetchPayments(); // Fetch payments again after a new withdrawal is made
        } catch (error) {
            setMessage('Rút tiền không thành công');
        }
    };

    useEffect(() => {
        fetchPayments(); // Fetch payments when the component is mounted
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Số tiền:
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </label>
                <button type="submit">Rút tiền</button>
            </form>
            {message && <p>{message}</p>}
            <h2>Lịch sử rút tiền</h2>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Số tiền</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                        <th>Thể loại</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.amount}</td>
                            <td>{new Date(payment.timestamp).toLocaleString()}</td>
                            <td style={{ color: payment.status === 'accept' ? '#8bc34a' : payment.status === 'decline' ? '#f44336' : '#FF6600' }}>{payment.status}</td>
                            <td>{payment.transaction_type}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TutorWithdraw;
