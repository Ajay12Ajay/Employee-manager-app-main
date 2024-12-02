import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Userproject.css"
import Navbar from '../NavLeft/Navbar'
import UserLeftSide from '../NavLeft/UserLeftside'
import { useNavigate } from 'react-router-dom'; 

const UserProject = () => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProject = async () => {
      try {
  
        const token = localStorage.getItem('token');
        const authorization = localStorage.getItem('authorization');

        if (!token || !authorization) {
          setError('Please log in to access project data.');
          return;
        }

        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const employeeId = loggedInUser.id;

        const response = await axios.get(`http://localhost:1111/getAllProjectsById/${employeeId}`, {
          headers: {
            Authorization: `${authorization} ${token}`
          }
          
        });
        console.log(response.data);

        setProject(response.data); 
      } catch (error) {
        if (error.response && error.response.status === 401) {
          
          navigate('/login');
        } else {
          setError('Error fetching project data');
          console.error('Error:', error);
        }
      }
    };

    fetchProject();
  }, [navigate]); 

  return (
    <div>
      <div className="parent">
        <Navbar />
        <UserLeftSide />
        <div className="main">
          <div className="down1">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {project && (
              <div className="usercard">
                <p style={{ fontSize: '25px', fontWeight: 'bold', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>Employee</p>
                <p>Id: <span style={{ fontWeight: 400 }}>{project.id}</span></p>
                <p>Project: <span style={{ fontWeight: 400 }}>{project.projectName}</span></p>
                <div className="date">
                  <p>Start Date: <span style={{ fontWeight: 400 }}>{project.startDate}</span></p>
                  <p>End Date: <span style={{ fontWeight: 400 }}>{project.endDate}</span></p>
                </div>
                <p>Status: <span className='status' style={{ fontWeight: 400 }}>{project.status}</span></p>
                <div id="des">
                  <p>Description: </p>
                  <p> <span style={{ fontWeight: 400 }}>{project.description}</span></p>
                </div>
                <div id="pr">
                  <p>Project Manager:</p>
                  <p> <span style={{ fontWeight: 400 }}>{project.projectManager}</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProject;
