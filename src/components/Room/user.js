import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

function UserMeetingRoom() {
  const [message, setMessage] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [remainingMinutes, setRemainingMinutes] = useState(null);
  const iframeRef = useRef(null); // Thêm một ref cho iframe

  useEffect(() => {
    const token = localStorage.getItem('token');
    const ws = new WebSocket(`wss://speak.id.vn/api/ws/meeting`);
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;
    const role = decodedToken.role;

    ws.onopen = () => {
      console.log('WebSocket is connected');
      ws.send(JSON.stringify({ role: role, username: username }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.link) {
        setMeetingLink(response.link);
        setRemainingMinutes(response.remaining_minutes);

        // Set a timeout to close the iframe after the remaining minutes
        setTimeout(() => {
          setMeetingLink(''); // Close the iframe by clearing the link
        }, response.remaining_minutes * 60 * 1000); // Convert minutes to milliseconds
      } else {
        setMessage(response.message);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket is closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Hàm này sẽ được gọi khi URL của iframe thay đổi
    const handleIframeLoad = () => {
      const iframeWindow = iframeRef.current.contentWindow;
      iframeWindow.addEventListener('beforeunload', () => {
        // Thực hiện chuyển hướng khi người dùng rời phòng
        window.location.href = 'https://speak.id.vn/user/history';
      });
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  return (
    <div>
      {message ? (
        <p>{message}</p>
      ) : (
        meetingLink && (
          <iframe
            ref={iframeRef}
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            src={meetingLink}
            style={{ height: '800px', width: '100%', border: 'none' }}
          ></iframe>
        )
      )}
    </div>
  );
}

export default UserMeetingRoom;
