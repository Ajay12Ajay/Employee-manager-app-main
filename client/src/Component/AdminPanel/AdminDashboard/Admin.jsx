import React, { useState, useEffect } from 'react';
import './Admin.css';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../NavLeft/Navbar';
import LeftSide from '../NavLeft/Leftside';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();


  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const handleUnauthorizedError = () => {
   
    console.error('Unauthorized access. Token may be expired or invalid.');
    
    navigate('/login');
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
      
          console.error('Missing token for authorization');
          navigate('/login');
          return; 
        }

        const response = await axios.get('http://localhost:1111/employees', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        setEmployees(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleUnauthorizedError();
        } else {
          setError('Error fetching employees data');
          console.error('Error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:1111/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee. Please try again later.');
    }
  };

  const addEmp = () => {
    navigate('/form');
  };

  return (
    <div className="parent">
      <Navbar />
      <LeftSide />
      <div className="main">
        <div className="up1">
          <div className="text2">
            Hello,Admin
            
          </div>
        </div>
      </div>
      <div className="main3">
        <div className="down2">
          <div className="table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email Id</th>
                  {/* <th>Password</th> */}
                  <th>Number</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Image</th>
                  <th>Manager</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="10">Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="10">Error: {error}</td>
                  </tr>
                ) : (
                  employees.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.emailId}</td>
                      {/* <td>{employee.password}</td> */}
                      <td>{employee.contactNumber}</td>
                      <td>{employee.age}</td>
                      <td>{employee.gender}</td>
                      <td>
                        <img src={employee.image} alt="err" style={{ width: '60px', height: '60px', borderRadius: '20px', objectFit: 'cover' }} />
                      </td>
                      <td>{employee.reportingManager}</td>
                      <td className="action-buttons">
                        <Link to="/admin/editpersonal">
                          <button id='edit'><CiEdit /></button>
                        </Link>
                        <button id='delete' onClick={() => deleteEmployee(employee.id)}><MdDeleteOutline /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
             <div className="addEmp1">
            <button className='btn' onClick={addEmp}>Add Employee</button>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Admin;
