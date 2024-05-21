// 1. Import các thư viện và component cần thiết
import React from "react";
// Import Header component
import Header from "components/Headers/Header.js";
import LearningTimeChart from './LearningTimeChart.js';
import ConnectionManager from './LearningTimeChart.js';
// 2. Tạo component mới
class NewDashboard extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="content">
          <LearningTimeChart />
        </div>
      </>
    );
  }
}

// 3. Export component
export default NewDashboard;
