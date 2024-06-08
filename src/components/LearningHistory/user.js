import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";

function UserMeetings() {
    const [meetings, setMeetings] = useState([]);
    const [show, setShow] = useState(false);
    const [currentMeeting, setCurrentMeeting] = useState(null);
    const { register, handleSubmit, setValue } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = (meeting) => {
        setCurrentMeeting(meeting);
        setShow(true);
    };

    const fetchMeetings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://speak.id.vn/api/user/meetings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMeetings(response.data);
        } catch (error) {
            console.error("Error fetching meetings", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('https://speak.id.vn/api/user/review', {
                user_rating: data.user_rating ?? null,
                user_feedback: data.user_feedback ?? null,
                user_suggest: data.user_suggest ?? null,
                meeting_id: currentMeeting.id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            handleClose();
            fetchMeetings(); // Refresh the meetings
        } catch (error) {
            console.error("Error submitting review", error);
        }
    };

    useEffect(() => {
        fetchMeetings(); // Fetch meetings when the component is mounted
    }, []);

    return (
        <div>
            <h2>Meeting History</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Start Time</th>
                        <th>Tutor Name</th>
                        <th>Topic</th>
                        <th>Your Feedback</th>
                        <th>Your Rating</th>
                        <th>Tutor Feedback</th>
                        <th>Tutor Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {meetings.map((meeting, index) => (
                        <tr key={index}>
                            <td>{meeting.id}</td>
                            <td>{new Date(meeting.start_time).toLocaleString()}</td>
                            <td>{meeting.tutor_name}</td>
                            <td>{meeting.topic}</td>
                            <td>{meeting.user_feedback}</td>
                            <td>{meeting.user_rating}</td>
                            <td>{meeting.tutor_feedback}</td>
                            <td>{meeting.tutor_rating}</td>
                            <td>
                                {meeting.user_feedback ? 'Reviewed' : <Button variant="primary" onClick={() => handleShow(meeting)}>Feedback</Button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rate Tutor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="rating">
                        <Form.Label>Your Rating</Form.Label>
                        <ReactStars
                            count={5}
                            onChange={(newRating) => {
                                setValue("user_rating", newRating);  // setValue is from react-hook-form
                            }}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </Form.Group>

                    <Form.Group controlId="reviewText">
                        <Form.Label>Your Feedback</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register("user_feedback")} />
                    </Form.Group>

                    <Form.Group controlId="userSuggest">
                        <Form.Label>User Suggestion</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register("user_suggest")} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserMeetings;