import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Select } from "antd";

function AdminCV() {
    const [cvHistory, setCVHistory] = useState([]);
    const [filter, setFilter] = useState('all');

    const handleChange = (value) => {
        setFilter(value);
    };

    const fetchCVHistory = async () => {
        try {
            const response = await axios.get('https://speak.id.vn/api//admin/cv/history');
            setCVHistory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = async (cvId, status) => {
        try {
            await axios.put(`https://speak.id.vn/api/admin/cv/${cvId}`, null, {
                params: {
                    status: status
                }
            });
            fetchCVHistory(); // Fetch CV history again after a status is updated
        } catch (error) {
            console.error(error);
        }
    };

    const viewCV = (id) => {
        window.open(`https://speak.id.vn/api/admin/cv/${id}`);
    };

    useEffect(() => {
        fetchCVHistory(); // Fetch CV history when the component is mounted
    }, []);

    return (
        <div>
            <h2>Quản lý lịch sử nộp CV</h2>
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
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID Gia sư</th>
                        <th>Thời gian nộp</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                        <th>CV</th>
                    </tr>
                </thead>
                <tbody>
                    {cvHistory.filter(cv => filter === 'all' || cv.status === filter).map((cv, index) => (
                        <tr key={index}>
                            <td>{cv.tutor_id}</td>
                            <td>{new Date(cv.submit_time).toLocaleString()}</td>
                            <td style={{ color: cv.status === 'accept' ? '#8bc34a' : cv.status === 'decline' ? '#f44336' : '#FF6600' }}>{cv.status}</td>
                            <td>
                                {cv.status === 'waiting' && (
                                    <>
                                        <Button variant="success" onClick={() => handleStatusChange(cv.id, 'accept')}>Chấp nhận</Button>
                                        <Button variant="danger" onClick={() => handleStatusChange(cv.id, 'decline')}>Từ chối</Button>
                                    </>
                                )}
                            </td>
                            <td>
                                <Button variant="light" style={{ backgroundColor: "#8bc34a" }} onClick={() => viewCV(cv.tutor_id)}>View CV</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminCV;
