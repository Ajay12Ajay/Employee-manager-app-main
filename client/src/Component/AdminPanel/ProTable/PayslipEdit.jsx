import React, { useRef, useState } from "react";
import Navbar from "../NavLeft/Navbar";
import LeftSide from "../NavLeft/Leftside";
import axios from "axios"; 

const PayslipEdit = () => {
  const [isUpdating, setIsUpdating] = useState(false); 
  const [updateError, setUpdateError] = useState(""); 

  const updateEmp = () => {
    setIsUpdating(true); 
    setUpdateError(""); 

    const formData = {
      id: employee.id.current.value,
      ctc: employee.ctc.current.value
    };

    const token = localStorage.getItem('token'); 

    axios.put(`http://localhost:1111/finances/${formData.id}?ctc=${formData.ctc}`, null, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    .then((response) => {
      console.log('CTC updated successfully:', response.data);
    
    })
    .catch((error) => {
      console.error('Error updating CTC:', error);
      if (error.response) {
        
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
        setUpdateError(`Server responded with status: ${error.response.status}`);
      } else if (error.request) {
    
        console.error('No response received:', error.request);
        setUpdateError('No response received from server');
      } else {
      
        console.error('Request setup error:', error.message);
        setUpdateError('Error setting up request');
      }
    })
    .finally(() => {
      setIsUpdating(false); 
    });
  };

  const employee = {
    id: useRef(),
    ctc: useRef()
  };

  return (
    <div>
      <div className="parent">
        <Navbar />
        <LeftSide />
        <div className="main1">
          <div className="down4">
            <div className="pro">
              <h1>Employee Finances Details</h1>
            </div>
            <div className="card4">
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Employee
              </p>
              <div className="inputCon">
                <p style={{ fontWeight: "600", marginRight: "5px" }}>
                  Employee Id:
                </p>
                <input type="number" ref={employee.id} />
              </div>
              <div className="inputCon">
                <p style={{ fontWeight: "600", marginRight: "5px" }}>
                  Employee CTC:
                </p>
                <input type="number" ref={employee.ctc} />
              </div>
              <div className="update">
                <button className="btn" onClick={updateEmp} disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update"}
                </button>
                {updateError && <p style={{ color: "red" }}>{updateError}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipEdit;
