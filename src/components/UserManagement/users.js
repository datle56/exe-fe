import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
function UserList() {
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editBalance, setEditBalance] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/admin/users')
            .then(response => {
                setUsers(response.data);
            });
    }, []);

    const startEditUser = (id, balance) => {
        setEditing(id);
        setEditBalance(balance);
    };

    const deleteUser = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8000/admin/users/${id}`)
                .then(() => {
                    setUsers(users.filter(user => user.id !== id));
                });
        }
    };
    const saveEditUser = (id) => {
        const balanceAsNumber = Number(editBalance);
        if (isNaN(balanceAsNumber)) {
            alert("Invalid balance. Please enter a number.");
            return;
        }
        axios.put(`http://localhost:8000/admin/users/${id}?balance=${balanceAsNumber}`)
            .then(() => {
                setUsers(users.map(user => user.id === id ? { ...user, balance: balanceAsNumber } : user));
                setEditing(null);
            });
    };
    return (
        <div>
            <h1>Users</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Online Status</th>  {/* Thêm cột mới */}
                        <th>Last Login</th>  {/* Thêm cột mới */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {editing === user.id ? (
                                    <input value={editBalance} onChange={(e) => setEditBalance(e.target.value)} />
                                ) : (
                                    user.balance
                                )}
                            </td>
                            <td style={{ color: user.online_status === 'online' ? '#008000' : '#FF0000' }}>{user.online_status}</td>  {/* Hiển thị trạng thái online */}
                            <td>{user.last_login}</td>  {/* Hiển thị thời gian đăng nhập cuối cùng */}
                            <td>
                                {editing === user.id ? (
                                    <Button variant="primary" onClick={() => saveEditUser(user.id)}>Save</Button>
                                ) : (
                                    <>
                                        <Button variant="primary" onClick={() => startEditUser(user.id, user.balance)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>  {/* Thêm nút Delete */}
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

export default UserList;