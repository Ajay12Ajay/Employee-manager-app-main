import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import Navbar from '../NavLeft/Navbar';
import UserLeftSide from '../NavLeft/UserLeftside';

const UserFinance = () => {
  const [finances, setFinances] = useState(null);
  const [error, setError] = useState(null);

  // Assuming you have logic to retrieve the logged-in employee ID
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const employeeId = loggedInUser.id;

  useEffect(() => {
    const fetchFinances = async () => {
      try {
        // Retrieve token and authorization from local storage (if applicable)
        const token = localStorage.getItem('token');
        const authorization = localStorage.getItem('authorization');

        // Check if token and authorization are present (if required by your backend)
        if (!token || !authorization) {
          setError('Please log in to access finance data.');
          return;
        }

        // Check for token expiration (if applicable)
        // Replace with your logic to check token expiration based on its structure
        // if (isTokenExpired(token)) {
        //   // Handle token refresh logic here (e.g., refresh token API call)
        //   setError('Token expired. Please log in again.');
        //   return;
        // }

        // const response = await axios.get(`http://localhost:1111/viewFinances/${employeeId}`,
        //   {
        //     headers: {
        //       Authorization: `${authorization} ${token}`,
        //     },
        //   }
        // );

        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const employeeId = loggedInUser.id;

        const response = await axios.get(`http://localhost:1111/viewFinances/${employeeId}`, {
          headers: {
            Authorization: `${authorization} ${token}` // Include authorization and token
          }
          
        });

        setFinances(response.data);
      } catch (error) {
        console.error('Error fetching finances:', error);
        setError('Error fetching finance details.');
        // Handle potential unauthorized access (401) error here (optional)
        // if (error.response && error.response.status === 401) {
        //   // Redirect to login page or handle appropriately
        // }
      }
    };

    fetchFinances();
  }, []);

  return (
    <div>
      <div className="parent">
        <Navbar />
        <UserLeftSide />
        <div className="main4">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {finances && (
            <div className="down4">
              <h1 style={{ fontSize: '45px', fontWeight: '600' }}>Finances Details</h1>
              <div className="card2">
                <div className="detail1">
                  <strong>Employee ID:</strong> {finances.id}
                </div>
                <div className="detail1">
                  <strong>Bank Name:</strong> {finances.bankName}
                </div>
                <div className="detail1">
                  <strong>Account Number:</strong> {finances.accountNumber}
                </div>
                <div className="detail1">
                  <strong>ifsc Code:</strong> {finances.ifscCode}
                </div>
                <div className="detail1">
                  <strong>Pan Card:</strong> {finances.panCard}
                </div>
                <div className="detail1">
                  <strong>CTC:</strong> {finances.ctc}
                </div>
                <div className="detail1">
                  <strong>PF:</strong> {finances.pf}
                </div>
                <div className="detail1">
                  <strong>HRA:</strong> {finances.hra}
                </div>
                <div className="detail1">
                  <strong>TDS:</strong> {finances.tds}
                </div>
                <div className="detail1">
                  <strong>Allowances:</strong> {finances.allowances}
                </div>
                <div className="detail1">
                  <strong>Net Salary:</strong> {finances.net_salary}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFinance;
