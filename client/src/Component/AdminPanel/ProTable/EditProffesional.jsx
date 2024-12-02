import React, { useRef } from "react";
import Navbar from "../NavLeft/Navbar";
import LeftSide from "../NavLeft/Leftside";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EditProffesional = () => {
  const navigate = useNavigate();

  const employee = {
    id: useRef(),
    designation: useRef(),
    type: useRef(),
  };

  const updateEmp = () => {
    const id = employee.id.current.value;
    const formData = {
      designation: employee.designation.current.value,
      type: employee.type.current.value,
    };

    axios
      .put(`http://localhost:1111/updateemployees/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        console.log('Employee professional details updated successfully:', response.data);
     
        navigate('/admin-dashboard');
      })
      .catch((error) => {
        console.error('Error updating employee professional details:', error);
       
      });
  };

  return (
    <div>
      <div className="parent">
        <Navbar />
        <LeftSide />
        <div className="main1">
          <div className="down4">
            <div className="pro">
              <h1>Employee Professional Details</h1>
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
                  Employee Designation:
                </p>
                <input type="text" ref={employee.designation} />
              </div>
              <div className="inputCon">
                <p style={{ fontWeight: "600", marginRight: "5px" }}>
                  Employee Type:
                </p>
                <input type="text" ref={employee.type} />
              </div>

              <div className="update">
                <button className="btn" onClick={updateEmp}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProffesional;
