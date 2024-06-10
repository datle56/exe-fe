import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Select } from 'antd';

function TutorEarnings() {
    const [earnings, setEarnings] = useState([]);
    const [filter, setFilter] = useState('all');

    const handleChange = (value) => {
        setFilter(value);
    };

    const fetchEarnings = async () => {
        try {
            const token = localStorage.getItem('token');  // Retrieve the token from local storage
            const response = await axios.get('https://speak.id.vn/api/tutor/earnings', {
                headers: {
                    Authorization: `Bearer ${token}`  // Include the token in the request headers
                }
            });
            setEarnings(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEarnings();
    }, []);

    return (
        <div>
            <h2>Quản lý thu nhập</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Student</th>
                        <th>Topic</th>
                        <th>Earning</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {earnings.filter(earning => filter === 'all' || earning.status === filter).map((earning, index) => (
                        <tr key={index}>
                            <td>{earning.id}</td>
                            <td>{new Date(earning.date).toLocaleDateString()}</td>
                            <td>{earning.username}</td>
                            <td>{earning.topic}</td>
                            <td>{earning.base_earnings}</td>
                            <td>{earning.bonus_type}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TutorEarnings;
