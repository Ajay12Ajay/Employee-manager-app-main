import React, { useRef } from 'react';
import axios from 'axios';
import Navbar from '../NavLeft/Navbar';
import LeftSide from '../NavLeft/Leftside';

const ProjectUpdate = () => {
  const project = {
    id: useRef(),
    projectName: useRef(),
    description: useRef(),
    startDate: useRef(),
    endDate: useRef(),
    projectManager: useRef(),
    status: useRef()
  };

  const updateProject = () => {
    const formData = {
      id: project.id.current.value,
      projectName: project.projectName.current.value,
      description: project.description.current.value,
      startDate: project.startDate.current.value,
      endDate: project.endDate.current.value,
      projectManager: project.projectManager.current.value, 
      status: project.status.current.value
    };

    axios.put(`http://localhost:1111/projects/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        console.log('Project updated successfully:', response.data);
      
      })
      .catch((error) => {
        console.error('Error updating project:', error);
    
      });
  };

  return (
    <div>
      <div className="parent">
        <Navbar />
        <LeftSide />
        <div className="down3">
          <div className="card3">
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>ID:</p>
              <input type="number" ref={project.id} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Project Name:</p>
              <input type="text" ref={project.projectName} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Description:</p>
              <input type="text" ref={project.description} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Start Date:</p>
              <input type="date" ref={project.startDate} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>End Date:</p>
              <input type="date" ref={project.endDate} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Project Manager:</p>
              <input type="text" ref={project.projectManager} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Status:</p>
              <select ref={project.status}>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
            <div className="update">
              <button className="btn" onClick={updateProject}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectUpdate;
