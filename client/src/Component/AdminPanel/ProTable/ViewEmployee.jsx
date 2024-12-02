import React, { useState, useEffect } from 'react';
import './Pro.css';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import Navbar from '../NavLeft/Navbar';
import LeftSide from '../NavLeft/Leftside';
import { Link } from 'react-router-dom';

const Protable = () => {
  // State variables
  const [data, setData] = useState([]); // Array to store fetched employee data
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const [error, setError] = useState(null); // Holds any error message
  const [searchQuery, setSearchQuery] = useState(''); // State variable for search query

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        // Retrieve JWT token from local storage (replace with your logic)
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Missing JWT token in local storage');
        }

        const response = await fetch('http://localhost:1111/employees', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const responseData = await response.json();
        setData(responseData); 
      } catch (error) {
        setError(error.message); 
        console.error('Error fetching data:', error); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData(); 
  }, []);


  const deleteEmp = (employeeId) => {

    console.log('Delete employee:', employeeId); 
  };

 
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (isLoading) {
    return <p>Loading data...</p>;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredEmployees = data.filter(employee => employee.id.toString().includes(searchQuery));

  return (
    <div>
      <div className="parent">
        <Navbar></Navbar>
        <LeftSide></LeftSide>
        <div className="main1">
          <div className="down2">
            <div className="pro">
              <h1>Employee Professional Details</h1>
              <input
                type="text"
                placeholder="Search by Employee ID"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{border:"1px solid black" ,borderRadius:"10px",padding: "0 10px" ,marginLeft:"10px"}}
              />
            </div>
            <div className="table-container">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                     <th>Name</th>
                    <th>Aadhar Card</th>
                    <th>Current Address</th>
                    <th>Permanent Address</th>
                    <th>Office Address</th>
                    <th>Company Name</th>
                    <th>Designation</th>
                    <th>Type</th>
                    {/* <th>Address</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.aadharCard}</td>
                      <td>{employee.currentAddress}</td>
                      <td>{employee.permanenttAddress}</td>
                      <td>{employee.officeAddress}</td>
                      <td>{employee.companyName}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.type}</td>
                      {/* <td>{employee.address}</td> */}
                      <td className="action-buttons">
                        <Link to="/admin/editProfessional">
                          <button id="edit">
                            <CiEdit />
                          </button>
                        </Link>
                        <button id="delete" onClick={() => deleteEmp(employee.id)}>
                          <MdDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protable;
