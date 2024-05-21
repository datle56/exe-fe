import React from 'react';
import './PaymentProfileCard.css';

const PaymentProfileCard = ({ avatar, name, email, lessons, credits }) => {
    return (
        <div className="payment-profile-card">
            <img src={avatar} alt="Avatar"/>
            <h2>{name}</h2>
            <p>{email}</p>
            <div className="info">
                <div>
                    <span>Lessons</span>
                    <h3>{lessons}</h3>
                </div>
                <div>
                    <span>Credits</span>
                    <h3>{credits}</h3>
                </div>
            </div>
        </div>
    );
};

export default PaymentProfileCard;