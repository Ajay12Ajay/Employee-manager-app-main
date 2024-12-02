import React, { useState, useEffect } from 'react';
import './User.css';
import Navbar from '../NavLeft/Navbar';
import UserLeftSide from '../NavLeft/UserLeftside';
import axios from 'axios';

const UserProdetails = () => {
  const [professionalDetails, setProfessionalDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchProfessionalDetails = async () => {
      setIsLoading(true);

   
      const token = localStorage.getItem('token');
      const authorization = localStorage.getItem('authorization');

     
      if (!token || !authorization) {
        setError('Please log in to access professional details.');
        setIsLoading(false);
        return;
      }

      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

      if (!loggedInUser) {
        setError('Please log in to access professional details.');
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
          setError('Error fetching professional details. Please check backend response.');
        } else {
          setProfessionalDetails(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Error fetching professional details.');
          console.error('Error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionalDetails();
  }, []);

  return (
    <div>
      <div className="parent">
        <Navbar />
        <UserLeftSide />
        <div className="main4">
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {professionalDetails && (
            <div className="down4">
              <h1 style={{ fontSize: "45px", fontWeight: "600" }}>Professional Details</h1>
              <div className="card2">
                {Object.entries(professionalDetails).map(([key, value]) => {
                  if (!['emailId', 'password', 'contactNumber', 'age', 'gender', 'image'].includes(key)) {
                    return (
                      <div className="detail1" key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProdetails;
