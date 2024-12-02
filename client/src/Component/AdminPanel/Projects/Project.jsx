import React, { useState, useEffect } from 'react';
import './Project.css';
import Navbar from '../NavLeft/Navbar';
import LeftSide from '../NavLeft/Leftside';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Project = () => {
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const authorization = localStorage.getItem('authorization');

      if (!token || !authorization) {
        setError('Unauthorized. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:1111/getAllProjects', {
          headers: {
            Authorization: `${authorization} ${token}`
          }
        });

        if (!response.data) {
          setError('Error fetching data from server.');
        } else {
          setData(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Error fetching data from server.');
          console.error('Error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const filteredProjects = data.filter(project => selectedStatus ? project.status === selectedStatus : true);

  const addProj = () => {
    navigate('/admin/addProject');
  };

  const deleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('token');
        const authorization = localStorage.getItem('authorization');

        if (!token || !authorization) {
          setError('Unauthorized. Please log in.');
          return;
        }

        const response = await axios.delete(`http://localhost:1111/deleteProject/${projectId}`, {
          headers: {
            Authorization: `${authorization} ${token}`
          }
        });

       
        if (response.status === 200) {
          const newData = data.filter(project => project.id !== projectId);
          setData(newData);
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        setError('Error deleting project.');
      }
    }

  };

  const renderStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return {color: 'green', backgroundColor: 'lightgreen' ,borderRadius: '5px', padding: '8px'}; // Example color for 'Open' status
      case 'IN_PROGRESS':
        return { color: 'black', backgroundColor: 'lightyellow' ,borderRadius: '5px', padding: '8px'}; // Example color for 'In Progress' status
      case 'ON_HOLD':
        return { color: 'orange', backgroundColor: 'lightcoral',borderRadius: '5px', padding: '8px'}; // Example color for 'On Hold' status
      case 'COMPLETED':
        return { color: 'blue', backgroundColor: 'lightblue',borderRadius: '5px', padding: '8px'}; // Example color for 'Completed' status
      default:
        return {}; 
    }
  };

  return (
    <div>
      <div className="parent">
        <Navbar />
        <LeftSide />
        <div className="main">
          <div className="top">
            <button className='statu' onClick={() => setSelectedStatus('OPEN')}>Open</button>
            <button className='statu' onClick={() => setSelectedStatus('IN_PROGRESS')}>In Progress</button>
            <button className='statu' onClick={() => setSelectedStatus(' ON_HOLD')}>On Hold</button>
            <button className='statu' onClick={() => setSelectedStatus('COMPLETED')}>Completed</button>
            <button className='statu' onClick={addProj}>Add Project</button>
          </div>
          <div className="down1">
            {error && <p>Error: {error}</p>}
            {isLoading && <p>Loading...</p>}
            {filteredProjects.map((project) => (
              <div className="card" key={project.id}>
                <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Project</p>
                <p>Id: <span style={{ fontWeight: 400 }}>{project.id}</span></p>
                <p>Name: <span style={{ fontWeight: 400 }}>{project.projectName}</span></p>
                <p>Description: <span style={{ fontWeight: 400 }}>{project.description}</span></p>
                <div className="date">
                  <p>Start Date: <span style={{ fontWeight: 400 }}>{project.startDate}</span></p>
                  <p>End Date: <span style={{ fontWeight: 400 }}>{project.endDate}</span></p>
                </div>
                <p>Project Manager: <span style={{ fontWeight: 400 }}>{project.projectManager}</span></p>
                <p>Status: <span style={{ fontWeight: 400, ...renderStatusColor(project.status) }}>{project.status}</span></p>
                <div id="btn">
                  <Link to="/admin/editProject"><button className='btn'>Edit</button></Link>
                  <button className="btn" onClick={() => deleteProject(project.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
