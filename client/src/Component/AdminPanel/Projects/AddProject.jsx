import React, { useRef } from 'react';
import axios from 'axios';
import Navbar from '../NavLeft/Navbar';
import LeftSide from '../NavLeft/Leftside';

const AddProject = () => {
  const employee = {
    id: useRef(),
    projectName: useRef(),
    startDate: useRef(),
    endDate: useRef(),
    description: useRef(),
    ProjectManager: useRef(),
    status: useRef()
  };

  const addProject = () => {
    const formData = {
      id: employee.id.current.value,
      projectName: employee.projectName.current.value,
      startDate: employee.startDate.current.value,
      endDate: employee.endDate.current.value,
      description: employee.description.current.value,
      ProjectManager: employee.ProjectManager.current.value,
      status: employee.status.current.value 
    };

    const token = localStorage.getItem('token');

    axios.post(`http://localhost:1111/status`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('Project added successfully:', response.data);

      })
      .catch((error) => {
        console.error('Error adding project:', error);

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
              <p style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>Project Name</p>
              <input type="text" name='employee' placeholder='Enter Project Name' ref={employee.projectName} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Id:</p>
              <input type="number" name='id' ref={employee.id} />
            </div>
            
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Start Date:</p>
              <input type="date" name='start' ref={employee.startDate} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>End Date:</p>
              <input type="date" name='end' ref={employee.endDate} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Description:</p>
              <input type="text" name='description' placeholder='Description of project' ref={employee.description} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Project Manager:</p>
              <input type="text" name='manager' placeholder='Enter project manager' ref={employee.ProjectManager} />
            </div>
            <div className="inputCont">
              <p style={{ fontWeight: '600', marginRight: '5px' }}>Status:</p>
              <select ref={employee.status}>
              <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
            <div className="update">
              <button className='btn' onClick={addProject}>Add Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
