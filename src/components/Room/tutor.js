import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';



function TutorMeetingRoom() {
  const [message, setMessage] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [remainingMinutes, setRemainingMinutes] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const ws = new WebSocket(`wss://speak.id.vn/api/ws/meeting`);
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;
    const role = decodedToken.role;

    ws.onopen = () => {
      console.log('WebSocket is connected');
      ws.send(JSON.stringify({ role: role, username: username}));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.link ) {
        setMeetingLink(response.link);
        setRemainingMinutes(response.remaining_minutes);

        // Đặt hẹn giờ để đóng iframe sau khi số phút còn lại đã trôi qua
        setTimeout(() => {
          setMeetingLink('');  // Đóng iframe bằng cách xóa link
        }, response.remaining_minutes * 60 * 1000);  // Chuyển từ phút sang mili giây
      } else {
        setMessage(response.message);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket is closed');
    };
    console.log(meetingLink)
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {message ? (
        <p>{message}</p>
      ) : (
        meetingLink && (
          <iframe
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            src={meetingLink}
            style={{ height: '800px', width: '100%', border: 0 }}
          ></iframe>
        )
      )}
    </div>
  );
}

export default TutorMeetingRoom;

