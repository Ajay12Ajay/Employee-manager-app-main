import React, { useRef } from "react";
import Navbar from "../NavLeft/Navbar";
import LeftSide from "../NavLeft/Leftside";
import axios from "axios";

const EditPersonal = () => {
  const employee = {
    id: useRef(),
    reportingManager: useRef(),
  };

  const update = async () => {
    const formData = {
      id: employee.id.current.value,
      reportingManager: employee.reportingManager.current.value,
    };

    try {
      const response = await axios.put(
        `http://localhost:1111/updateemployee/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Employee updated successfully:', response.data);
  
    } catch (error) {
      console.error('Error updating employee:', error);

     
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access. Please check your token or login again.');
      } else if (error.response && error.response.status >= 400) {
    
        console.error('Error:', error.response.data);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <div>
      <div className="parent">
        <Navbar />
        <LeftSide />
        <div className="main1">
          <div className="down4">
            <div className="pro">
              <h1>Employee Personal Details</h1>
            </div>
            <div className="card4">
              <p style={{ fontSize: "25px", fontWeight: "bold", textAlign: "center" }}>
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
                  Reporting Manager:
                </p>
                <input type="text" id="manager" ref={employee.reportingManager} />
              </div>

              <div className="update">
                <button className="btn" onClick={update}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPersonal;
