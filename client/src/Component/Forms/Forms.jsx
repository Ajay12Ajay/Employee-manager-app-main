import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Forms.css';
import { useNavigate } from 'react-router-dom'; 

const Forms = () => {
  const [currentForm, setCurrentForm] = useState('first');
  const navigate = useNavigate();

  const firstFormRefs = {
    name: useRef(),
    emailId: useRef(),
    password: useRef(),
    contactNumber: useRef(),
    age: useRef(),
    gender: useRef(),
    image: useRef(),
    reportingManager: useRef(),
    aadharCard: useRef(),
    companyName: useRef(),
    designation: useRef(),
    type: useRef(),
    currentAddress: useRef(),
    permanenttAddress: useRef(),
    officeAddress: useRef()
  };

  const secondFormRefs = {
    bankName: useRef(),
    accountNumber: useRef(),
    ifscCode: useRef(),
    panCard: useRef(),
    ctc: useRef(),
    employeeId: useRef()
  };

  const handleNext = (event) => {
    event.preventDefault();
    setCurrentForm('second');
  };

  const handleSubmitFirstForm = (event) => {
    event.preventDefault();
    const formData = {
      name: firstFormRefs.name.current.value,
      emailId: firstFormRefs.emailId.current.value,
      password: firstFormRefs.password.current.value,
      contactNumber: firstFormRefs.contactNumber.current.value,
      age: firstFormRefs.age.current.value,
      gender: firstFormRefs.gender.current.value,
      image: firstFormRefs.image.current.value,
      reportingManager: firstFormRefs.reportingManager.current.value,
      aadharCard: firstFormRefs.aadharCard.current.value,
      companyName: firstFormRefs.companyName.current.value,
      designation: firstFormRefs.designation.current.value,
      type: firstFormRefs.type.current.value,
      currentAddress: firstFormRefs.currentAddress.current.value,
      permanenttAddress: firstFormRefs.permanenttAddress.current.value,
      officeAddress: firstFormRefs.officeAddress.current.value
    };

    axios.post('http://localhost:1111/employee', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log('Employee saved successfully:', response.data);
        setCurrentForm('second');
      })
      .catch(error => {
        console.error('Error saving employee:', error);
      });
  };

  const handleSubmitSecondForm = (event) => {
    event.preventDefault();
    const formData = {
      bankName: secondFormRefs.bankName.current.value,
      accountNumber: secondFormRefs.accountNumber.current.value,
      ifscCode: secondFormRefs.ifscCode.current.value,
      panCard: secondFormRefs.panCard.current.value,
      ctc: secondFormRefs.ctc.current.value,
      employeeId: secondFormRefs.employeeId.current.value
    };

    axios.post('http://localhost:1111/savePayslip', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log('Payslip saved successfully:', response.data);
        navigate('/admin-dashboard');
      })
      .catch(error => {
        console.error('Error saving payslip:', error);
      });
  };

  return (
    <div className='fm1'>
      <div className="container">
        {currentForm === 'first' && (
          <div className="container1">
            <form className='details' onSubmit={handleSubmitFirstForm}>
              <h1 id='text'>Personal Details</h1>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder='Enter Name' ref={firstFormRefs.name} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" placeholder='Enter Email' ref={firstFormRefs.emailId} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder='Enter Password' ref={firstFormRefs.password} />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number:</label>
                <input type="text" id="contactNumber" placeholder='Enter Contact Number' ref={firstFormRefs.contactNumber} />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input type="text" id="age" placeholder='Enter Age' ref={firstFormRefs.age} />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select id="gender" ref={firstFormRefs.gender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input type="text" id="image" ref={firstFormRefs.image} />
              </div>
              <div className="form-group">
                <label htmlFor="reportingManager">Reporting Manager:</label>
                <input type="text" id="reportingManager" placeholder='Enter Reporting Manager' ref={firstFormRefs.reportingManager} />
              </div>
              <div className="form-group">
                <label htmlFor="aadharCard">Aadhar Card:</label>
                <input type="text" id="aadharCard" placeholder='Enter Aadhar Card Number' ref={firstFormRefs.aadharCard} />
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Company Name:</label>
                <input type="text" id="companyName" placeholder='Enter Company Name' ref={firstFormRefs.companyName} />
              </div>
              <div className="form-group">
                <label htmlFor="designation">Designation:</label>
                <input type="text" id="designation" placeholder='Enter Designation' ref={firstFormRefs.designation} />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" placeholder='Enter Type' ref={firstFormRefs.type} />
              </div>
              <div className="form-group">
                <label htmlFor="currentAddress">Current Address:</label>
                <input type="text" id="currentAddress" placeholder='Enter Current Address' ref={firstFormRefs.currentAddress} />
              </div>
              <div className="form-group">
                <label htmlFor="permanentAddress">Permanent Address:</label>
                <input type="text" id="permanentAddress" placeholder='Enter Permanent Address' ref={firstFormRefs.permanenttAddress} />
              </div>
              <div className="form-group">
                <label htmlFor="officeAddress">Office Address:</label>
                <input type="text" id="officeAddress" placeholder='Enter Office Address' ref={firstFormRefs.officeAddress} />
              </div>
              <button className='submit'>Next</button>
            </form>
          </div>
        )}
        {currentForm === 'second' && (
          <div className="container5">
            <h1 id='text'>Professional Details</h1>
            <form className='details' onSubmit={handleSubmitSecondForm}>
              <div className="form-group">
                <label htmlFor="bankName">Bank Name:</label>
                <input type="text" id="bankName" placeholder='Enter Bank Name' ref={secondFormRefs.bankName} />
              </div>
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number:</label>
                <input type="text" id="accountNumber" placeholder='Enter Account Number' ref={secondFormRefs.accountNumber} />
              </div>
              <div className="form-group">
                <label htmlFor="ifscCode">IFSC Code:</label>
                <input type="text" id="ifscCode" placeholder='Enter IFSC Code' ref={secondFormRefs.ifscCode} />
              </div>
              <div className="form-group">
                <label htmlFor="panCard">Pan Card:</label>
                <input type="text" id="panCard" placeholder='Enter Pan Card Number' ref={secondFormRefs.panCard} />
              </div>
              <div className="form-group">
                <label htmlFor="ctc">CTC:</label>
                <input type="text" id="ctc" placeholder='Enter CTC' ref={secondFormRefs.ctc} />
              </div>
              <div className="form-group">
                <label htmlFor="employeeId">Employee ID:</label>
                <input type="text" id="employeeId" placeholder='Enter Employee ID' ref={secondFormRefs.employeeId} />
              </div>
              <button className='submit'>Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forms;
