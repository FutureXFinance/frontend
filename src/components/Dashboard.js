import React from 'react';
import './styles/Dashboard.css';
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to FutureXFinance</h1>
      <div className="under-development">
        <h2>AI Tools Under Development</h2>
        <p>Our cutting-edge AI tools are currently under development.  We're working hard to bring you the best financial AI Automation tools.</p>
        {/* <div className="progress-bar"> */}
          {/* <div className="progress-bar-fill" style={{ width: '75%' }}>Adjust percentage as needed</div> */}
        {/* </div> */}
        <p>Expected Launch: January 1, 2026</p> 
      </div>
    </div>
  );
};

export default Dashboard;
