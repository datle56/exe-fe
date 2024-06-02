import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function AdminMeetings() {
    const [meetings, setMeetings] = useState([]);

    const fetchMeetings = async () => {
        try {
            const response = await axios.get('https://speak.id.vn/api/admin/meetings');
            setMeetings(response.data);
        } catch (error) {
            console.error("Error fetching meetings", error);
        }
    };

    useEffect(() => {
        fetchMeetings(); // Fetch meetings when the component is mounted
    }, []);

    return (
        <div>
            <h2>Admin Meeting List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Link</th>
                        <th>Start Time</th>
                        <th>User Name</th>
                        <th>Tutor Name</th>
                        <th>User Rating</th>
                        <th>User Feedback</th>
                        <th>Tutor Rating</th>
                        <th>Tutor Feedback</th>
                        <th>User Suggestion</th>
                        <th>Tutor Suggestion</th>
                    </tr>
                </thead>
                <tbody>
                    {meetings.map((meeting, index) => (
                        <tr key={index}>
                            <td>{meeting.id}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    href={meeting.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Join Meet
                                </Button>
                            </td>
                            <td>{new Date(meeting.start_time).toLocaleString()}</td>
                            <td>{meeting.user_name}</td>
                            <td>{meeting.tutor_name}</td>
                            <td>{meeting.user_rating}</td>
                            <td>{meeting.user_feedback}</td>
                            <td>{meeting.tutor_rating}</td>
                            <td>{meeting.tutor_feedback}</td>
                            <td>{meeting.user_suggest}</td>
                            <td>{meeting.tutor_suggest}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminMeetings;
