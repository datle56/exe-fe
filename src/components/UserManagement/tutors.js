import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TutorList() {
    const [tutors, setTutors] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editBalance, setEditBalance] = useState('');



    useEffect(() => {
        axios.get('https://speak.id.vn/api/admin/tutors')
            .then(response => {
                setTutors(response.data);
            });
    }, []);

    const startEditTutor = (id, balance) => {
        setEditing(id);
        setEditBalance(balance);
    };

    const deleteTutor = (id) => {
        axios.delete(`https://speak.id.vn/api/admin/tutors/${id}`)
            .then(() => {
                setTutors(tutors.filter(tutor => tutor.id !== id));
            });
    };

    const saveEditTutor = (id) => {
        const balanceAsNumber = Number(editBalance);
        if (isNaN(balanceAsNumber)) {
            alert("Invalid balance. Please enter a number.");
            return;
        }
        axios.put(`https://speak.id.vn/api/admin/tutors/${id}?balance=${balanceAsNumber}`)
            .then(() => {
                setTutors(tutors.map(tutor => tutor.id === id ? { ...tutor, balance: balanceAsNumber } : tutor));
                setEditing(null);
            });
    };

    return (
        <div>
            <h1>Tutors</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Online Status</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tutors.map(tutor => (
                        <tr key={tutor.id}>
                            <td>{tutor.id}</td>
                            <td>{tutor.username}</td>
                            <td>{tutor.email}</td>
                            <td>
                                {editing === tutor.id ? (
                                    <input value={editBalance} onChange={(e) => setEditBalance(e.target.value)} />
                                ) : (
                                    tutor.balance
                                )}
                            </td>
                            <td style={{ color: tutor.online_status === 'online' ? '#008000' : '#FF0000' }}>{tutor.online_status}</td>
                            <td>{tutor.last_login}</td>
                            <td>
                                {editing === tutor.id ? (
                                    <Button variant="primary" onClick={() => saveEditTutor(tutor.id)}>Save</Button>
                                ) : (
                                    <>
                                        <Button variant="primary" onClick={() => startEditTutor(tutor.id, tutor.balance)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteTutor(tutor.id)}>Delete</Button>
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

export default TutorList;
