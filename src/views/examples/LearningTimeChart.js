import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const LearningTimeChart = () => {
  const [data, setData] = useState({});

  // Hàm fetchData
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/user/home', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json); // Cập nhật state
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Gọi hàm fetchData khi component được render
  useEffect(() => {
    fetchData();
  }, []);

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: data.learning_times_last_7_days?.map(item => item.date),
    datasets: [
      {
        label: 'Learning Time',
        data: data.learning_times_last_7_days?.map(item => item.learning_time),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '300px', margin: 'auto' }}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }}
      />
    </div>
  );
};

export default LearningTimeChart;


// import React, { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';

// function ConnectionManager() {
//   const [loading, setLoading] = useState(false);
//   const [matchUrl, setMatchUrl] = useState('');
//   const [message, setMessage] = useState('');
//   const [ws, setWs] = useState(null);

//   async function getMatchFromBackend() {
//     const response = await fetch('/api/match');
//     const data = await response.json();
//     return data;
//   }
  
//   const handleMatch = async () => {
//     setLoading(true);
//     const match = await getMatchFromBackend();
//     if (match) {
//       const redirectUrl = match.redirectUrl;
//       setMatchUrl(redirectUrl);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const decodedToken = jwtDecode(token);
//     const username = decodedToken.username;
//     const role = decodedToken.role; // Assuming the token includes the role

//     if (!ws) {
//       const websocket = new WebSocket(`ws://localhost:8000/ws/${username}/${role}`);
//       setWs(websocket);
//     }

//     if (ws) {
//       ws.onopen = () => {
//         console.log('WebSocket is connected');
//         ws.send(JSON.stringify({ token }));
//       };
//       ws.onmessage = (event) => {
//         const response = JSON.parse(event.data);
//         if (response.redirect_url) {
//           window.location.href = response.redirect_url;
//         }
//         if (response.message) {
//           setMessage(response.message);
//         }
//       };
//       ws.onclose = () => {
//         console.log('WebSocket is closed');
//       };
//     }

//     return () => {
//       if (ws) {
//         ws.close();
//       }
//     };
//   }, [ws]);

//   return (
//     <div>
      
//       {message && <p>{message}</p>}
//       <button onClick={handleMatch}>Match</button>
//       {loading && <div>Loading...</div>}
//       {matchUrl && (
//         lấy 
//       )}
//     </div>
//   );
// }

// export default ConnectionManager;

// function ConnectionManager() {
//   const [loading, setLoading] = useState(false);
//   const [matchUrl, setMatchUrl] = useState('');
//   const [message, setMessage] = useState('');
//   const [ws, setWs] = useState(null);

//   async function getMatchFromBackend() {
//     const response = await fetch('/api/match');
//     const data = await response.json();
//     return data;
//   }
  
//   const handleMatch = async () => {
//     setLoading(true);
//     const match = await getMatchFromBackend();
//     if (match) {
//       const redirectUrl = match.redirectUrl;
//       setMatchUrl(redirectUrl);
//       // Sau 90 phút, hủy URL
//       setTimeout(() => setMatchUrl(null), 90 * 60 * 1000);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const decodedToken = jwtDecode(token);
//     const username = decodedToken.username;
//     const role = decodedToken.role; // Assuming the token includes the role

//     if (!ws) {
//       const websocket = new WebSocket(`ws://localhost:8000/ws/${username}/${role}`);
//       setWs(websocket);
//     }

//     if (ws) {
//       ws.onopen = () => {
//         console.log('WebSocket is connected');
//         ws.send(JSON.stringify({ token }));
//       };
//       ws.onmessage = (event) => {
//         const response = JSON.parse(event.data);
//         if (response.redirect_url) {
//           window.location.href = response.redirect_url;
//         }
//         if (response.message) {
//           setMessage(response.message);
//         }
//       };
//       ws.onclose = () => {
//         console.log('WebSocket is closed');
//       };
//     }
//   }, [ws]); // Thêm ws vào mảng dependency để useEffect chạy lại khi ws thay đổi

//   return (
//     <div>
//       {loading ? 'Đang tải...' : matchUrl ? (
//         <iframe
//           allow="camera; microphone; fullscreen; display-capture; autoplay"
//           src={matchUrl}
//           style={{ height: '100%', width: '100%', border: '0px' }}
//         />
//       ) : 'Chưa được kết nối'}
//     </div>
//   );
// }

// export default ConnectionManager;