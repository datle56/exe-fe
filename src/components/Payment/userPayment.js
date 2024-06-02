import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function UserPayment() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://speak.id.vn/api/user/payments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setPayments(response.data.payments);
            console.log("test", payments);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://speak.id.vn/api/user/payment', {
                amount: amount
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage(response.data.message);
            fetchPayments(); // Fetch payments again after a new payment is made
        } catch (error) {
            setMessage('Thanh toán không thành công');
        }
    };

    useEffect(() => {
        fetchPayments(); // Fetch payments when the component is mounted
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
            <h2>Payment history</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Type</th>
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

export default UserPayment;
