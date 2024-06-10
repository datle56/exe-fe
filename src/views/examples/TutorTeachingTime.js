import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const TeachingTimeChart = () => {
  const [data, setData] = useState({});

  // Hàm fetchData
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://speak.id.vn/api/tutor/home', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json); // Cập nhật state
      console.log(json); // Log dữ liệu nhận về
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
    labels: data.teaching_times_last_7_days?.map(item => item.date),
    datasets: [
      {
        label: 'Teaching Time',
        data: data.teaching_times_last_7_days?.map(item => item.teaching_time),
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

export default TeachingTimeChart;
