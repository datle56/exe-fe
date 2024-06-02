import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function CV() {
    const [cv, setCv] = useState(null);
    const [cvHistory, setCvHistory] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCvHistory = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://speak.id.vn/api/tutor/cv/history', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCvHistory(response.data);
            const latestCV = response.data[0];
            if (latestCV && (latestCV.status === 'waiting' || latestCV.status === 'accept')) {
                setIsSubmitted(true);
            }
        };

        fetchCvHistory();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) {
            setMessage('Bạn đã nộp CV rồi');
            return;
        }
        const formData = new FormData();
        formData.append('cv', cv);

        const token = localStorage.getItem('token');
        await axios.post('https://speak.id.vn/api/tutor/cv/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        setIsSubmitted(true);
        setMessage('CV uploaded successfully');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setCv(e.target.files[0])} />
                <button type="submit">Gửi</button>
            </form>
            <div>
                <h2>Lịch sử nộp CV</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>CV #</th>
                            <th>Trạng thái</th>
                            <th>Thời gian nộp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cvHistory.map((cv, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{cv.status}</td>
                                <td>{new Date(cv.submit_time).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}
export default CV;
