import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function AdminBuyPacked() {
    const [buyPackedHistory, setBuyPackedHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);

    const fetchBuyPackedHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/admin/buypacked');
            setBuyPackedHistory(response.data);
            setFilteredHistory(response.data); // Initialize filteredHistory with all data
        } catch (error) {
            console.error("Error fetching buy packed history", error);
        }
    };

    useEffect(() => {
        fetchBuyPackedHistory(); // Fetch buy packed history when the component is mounted
    }, []);

    const handleAction = async (id, action) => {
        try {
            const parsedId = parseInt(id); // Chuyển đổi id sang kiểu int
            const response = await axios.put(`http://localhost:8000/admin/buypacked/${parsedId}`, {
                payment_id: parsedId,
                status: action 
            });
            console.log(response.data.message);
            fetchBuyPackedHistory(); // Refetch buy packed history after action is performed
        } catch (error) {
            console.error("Error performing action", error);
        }
    };
    

    const handleFilter = (status) => {
        // Filter buy packed history based on status
        const filteredData = buyPackedHistory.filter(item => item.status === status);
        setFilteredHistory(filteredData);
    };

    return (
        <div>
            <h2>Admin Buy Packed History</h2>
            <Button variant="primary" onClick={() => handleFilter('waiting')}>Filter by Waiting</Button>{' '}
            <Button variant="secondary" onClick={() => handleFilter('accept')}>Filter by Accept</Button>{' '}
            <Button variant="danger" onClick={() => handleFilter('decline')}>Filter by Decline</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Package ID</th>
                        <th>Status</th>
                        <th>Purchase Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHistory.map((history, index) => (
                        <tr key={index}>
                            <td>{history.id}</td>
                            <td>{history.username}</td>
                            <td>{history.package_id}</td>
                            <td>{history.status}</td>
                            <td>{new Date(history.purchase_date).toLocaleString()}</td>
                            <td>
                                {history.status === 'waiting' && (
                                    <>
                                        <Button variant="success" onClick={() => handleAction(history.id, 'accept')}>Accept</Button>{' '}
                                        <Button variant="danger" onClick={() => handleAction(history.id, 'decline')}>Decline</Button>
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

export default AdminBuyPacked;
