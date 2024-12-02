import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payslip.css';
import Navbar from '../NavLeft/Navbar';
import LeftSide from '../NavLeft/Leftside';
import html2pdf from "html2pdf.js";

const Payslip = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = () => {
    const payslipContainer = document.getElementById("payslip-container");
    html2pdf().from(payslipContainer).save("payslip.pdf");
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
      
        const token = localStorage.getItem('token');
        const authorization = localStorage.getItem('authorization');


        if (!token || !authorization) {
          setError('Please log in to access employee data.');
          return;
        }


        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const employeeId = loggedInUser.id;

  
        const response = await axios.get(`http://localhost:1111/viewFinances/${employeeId}`, {
          headers: {
            Authorization: `${authorization} ${token}`
          }
        });


        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('Error fetching employee data.');
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <div>
      <div className="parent">
        <Navbar />
        <LeftSide />
        <div className="main1">
          <div className="down8">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {employeeData && (
              <div className="container9" id="payslip-container">
                <div className="header">
                  <h1>Employee Payslip</h1>
                </div>
                <div className="employee-details">
                  <h2>Employee Details</h2>
                  <p>
                    <strong>Employee ID:</strong> {employeeData.employee.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {employeeData.employee.name}
                  </p>
                
                </div>
                <div className="salary-details">
                  <h2>Salary Details</h2>
                  <table className="salary-table">
                    <thead>
                      <tr>
                        <th>Basic Salary</th>
                        <th>Net Salary</th>
                        <th>HRA</th>
                        <th>TDS</th>
                        <th>PF</th>
                        <th>Allowance</th>
                        <th>CTC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{employeeData.basicsalary}</td>
                        <td>{employeeData.net_salary}</td>
                        <td>{employeeData.hra}</td>
                        <td>{employeeData.tds}</td>
                        <td>{employeeData.pf}</td>
                        <td>{employeeData.allowances}</td>
                        <td>{employeeData.ctc}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             
                <div className="sign">
                  <p>Employee Signature</p>
                  <p>Manager Signature</p>
                </div>
                <div className="download">
                  <button className="btn"  onClick={handleDownload}>Download</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payslip;
