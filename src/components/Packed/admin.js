import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function AdminBuyPacked() {
    const [buyPackedHistory, setBuyPackedHistory] = useState([]);

    const fetchBuyPackedHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/admin/buypacked');
            setBuyPackedHistory(response.data);
        } catch (error) {
            console.error("Error fetching buy packed history", error);
        }
    };

    useEffect(() => {
        fetchBuyPackedHistory(); // Fetch buy packed history when the component is mounted
    }, []);

    return (
        <div>
            <h2>Admin Buy Packed History</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Package ID</th>
                        <th>Balance Before Purchase</th>
                        <th>Balance After Purchase</th>
                        <th>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {buyPackedHistory.map((history, index) => (
                        <tr key={index}>
                            <td>{history.id}</td>
                            <td>{history.username}</td>
                            <td>{history.package_id}</td>
                            <td>{history.balance_before_purchase}</td>
                            <td>{history.balance_after_purchase}</td>
                            <td>{new Date(history.purchase_date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminBuyPacked;
