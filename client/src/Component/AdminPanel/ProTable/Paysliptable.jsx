import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import './Pro.css';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import Navbar from '../NavLeft/Navbar';
import LeftSide from '../NavLeft/Leftside';
import { Link } from 'react-router-dom';

const PayslipTable = () => {
  // State variables to manage data, loading state, and errors
  const [data, setData] = useState([]); // Array to store fetched data
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const [error, setError] = useState(null); // Holds any error message

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        // Fetch data from the backend API
        const response = await fetch('http://localhost:1111/viewAllFinances', {
          // Here's where you add your JWT authentication headers:
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your JWT token retrieval logic
          },
        });

        if (!response.ok) { // Check for successful response
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const responseData = await response.json(); // Parse the JSON response
        setData(responseData); // Update the data state
      } catch (error) {
        setError(error.message); // Set error message in state
        console.error('Error fetching data:', error); // Log the error for debugging
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchData(); // Call the fetchData function on component mount
  }, []); // Empty dependency array ensures fetchData runs only once

  // Display loading message while data is being fetched
  if (isLoading) {
    return <p>Loading data...</p>;
  }

  // Display error message if there's an error
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the table with fetched data
  return (
    <div>
      <div className="parent">
        <Navbar></Navbar>
        <LeftSide></LeftSide>
        <div className="main1">
          <div className="down2">
            <div className="pro">
              <h1>Employee Finances Details</h1>
            </div>
            <div className="table-container">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Account Number</th>
                    <th>Bank Name</th>
                    <th>Ifsc Code</th>
                    {/* <th>Pan Card</th> */}
                    <th>CTC</th>
                    <th>Basic Salary</th>
                    <th>PF</th>
                    <th>HRA</th>
                    <th>TDS</th>
                    <th>Allowances</th>
                    <th>Net Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.accountNumber}</td>
                      <td>{employee.bankName}</td>
                      <td>{employee.ifscCode}</td>
                      {/* <td>{employee.panCard}</td> */}
                      <td>{employee.ctc}</td>
                      <td>{employee.basicsalary}</td>
                      <td>{employee.pf}</td>
                      <td>{employee.hra}</td>
                      <td>{employee.tds}</td>
                      <td>{employee.allowances}</td>
                      <td>{employee.net_salary}</td>
                      <td className="action-buttons">
                        <Link to="/admin/payslipEdit">
                          <button id="edit">
                            <CiEdit />
                          </button>
                        </Link>
                        <button id="delete">
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

export default PayslipTable;
