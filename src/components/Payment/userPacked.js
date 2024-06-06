import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function UserBuyPacked() {
    const [message, setMessage] = useState('');
    const [buyPacked, setBuyPacked] = useState([]);

    const fetchBuyPacked = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://speak.id.vn/api/user/buypacked', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setBuyPacked(response.data.buypacked);
            console.log("test", buyPacked);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBuyPacked(); // Fetch buyPacked when the component is mounted
    }, []);

    return (
        <div>
            {message && <p>{message}</p>}
            <h2>Buy Packed history</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Package ID</th>
                        <th>Purchase Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {buyPacked.map((packed, index) => (
                        <tr key={index}>
                            <td>{packed.user_id}</td>
                            <td>{packed.package_id}</td>
                            <td>{new Date(packed.purchase_date).toLocaleString()}</td>
                            <td style={{ color: packed.status === 'accept' ? '#8bc34a' : packed.status === 'decline' ? '#f44336' : '#FF6600' }}>{packed.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UserBuyPacked;
