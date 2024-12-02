import React, { useState, useEffect } from 'react';
import './User.css';
import Navbar from '../NavLeft/Navbar';
import UserLeftSide from '../NavLeft/UserLeftside';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setIsLoading(true);


      const token = localStorage.getItem('token');
      const authorization = localStorage.getItem('authorization');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

     
      if (!token || !authorization ) {
        setError('Please log in to access user data.');
        setIsLoading(false);
        return;
      }

      
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

      if (!loggedInUser) {
        setError('Please log in to access user data.');
        setIsLoading(false);
        return;
      }

      const employeeId = loggedInUser.id;

      try {
        const response = await axios.get(`http://localhost:1111/employee/${employeeId}`, {
          headers: {
            Authorization: `${authorization} ${token}` 
          }
        });
        if (!response.data) {
          setError('Error fetching employee data. Please check backend response.');
        } else {
          setEmployeeData(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Error fetching employee data.');
          console.error('Error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <div>
      <div className="parent">
        <Navbar />
        <UserLeftSide />
        <div className="main">
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {employeeData && (
            <>
              <div className="up">
                <div className="circle">
                  
                  <img src={employeeData.image} alt="error" />
                </div>
                <div className="text1">
                  <p>Hello, {employeeData.name}</p>
                  <p>{employeeData.designation}</p>
                </div>
              </div>
              <div className="down">
                <div className="down-left">
                  <p><strong>Id: </strong>{employeeData.employeeId}</p>
                  <p><strong>Age:</strong> {employeeData.age}</p>
                  <p><strong>Mobile:</strong> {employeeData.contactNumber}</p>
                  <p><strong>Email: </strong>{employeeData.emailId}</p>
                  <p><strong>Reporting Manager:</strong> {employeeData.reportingManager}</p>
                  <p><strong>Description: </strong>Proven experience in developing and testing code and administering systems and networks. Seeking a full-time software development position to deliver solutions to business needs.</p>
                </div>
                <div className="down-right">
                  
                </div>
              </div>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
