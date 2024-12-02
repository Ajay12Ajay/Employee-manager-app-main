
import React, { useState } from 'react';
import './EditProfile.css'; 
import Navbar from '../NavLeft/Navbar';
import UserLeftSide from '../NavLeft/UserLeftside';
import { useRef } from 'react';
 
//  const employee1={
//   name: useRef(),
//   password: useRef(),
//   age: useRef(),
//   gender: useRef(),
//   email: useRef(),
//   phone: useRef(),
//   image: useRef()
//  }

//  const employee2 = {
//   account: useRef(),
//   ifsc: useRef(),
//   addhar: useRef(),
//   pan: useRef(),
//   type: useRef(),
//   ctc: useRef()
// };

const updateEmp=()=>{
  
}


const EditProfile = () => {
  const [currentForm, setCurrentForm] = useState('first'); 

  const handleNext = (event) => {
    event.preventDefault(); 
    setCurrentForm('second'); 
  };

  const renderForm = (form) => {
    switch (form) {
      case 'first':
        return (
          <div className="cont">
          <form className='detail' onSubmit={handleNext}>
            <h1 id='text2'>Personal Details</h1>
           
          <div className="frmgroup">
            <label htmlFor="name">Name:</label>
            <input type="text2" id="name" placeholder='Enter Name' ref={employee1.name}/>
          </div>
          <div className="frmgroup">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder='Enter Password'  ref={employee1.password} />
          </div>
          <div className="frmgroup">
    <label htmlFor="age">Age:</label>
    <input type="number" id="age" placeholder='Enter Age'  ref={employee1.age} />
  </div>
  <div className="frmgroup">
    <label htmlFor="gender">Gender:</label>
    <select id="gender" name="gender" required  ref={employee1.gender} >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div className="frmgroup">
    <label htmlFor="email">Email:</label>
    <input type="text2" id="email" placeholder='Enter Email' ref={employee1.email} />
  </div>
  <div className="frmgroup">
    <label htmlFor="phone">Phone:</label>
    <input type="number" id="phone" placeholder='Enter Mobile Number' ref={employee1.phone} />
  </div>
  <div class="frmgroup">
  <label for="image">Image:</label>
  <input type="file" id="image" accept="image/*" class="custom-file-input"  ref={employee1.image}/>
</div>
  <div className="frmgroup">
    <label htmlFor="manager">Address:</label>
    <input type="text2" id="address" placeholder='Enter Your Address'  ref={employee1.address} />
  </div>
          <button className='submit'>Next</button>
        </form>
        </div>
        );
      case 'second':
        return (

         
    <div className="cont5">
            <h1 id='text2'>Professional Details</h1> 
            <form className='detail'>
          
   <div className="frmgroup">
     <label htmlFor="name">Account:</label>
     <input type="number" id="account" placeholder='Enter Account Number' ref={employee2.account}/>
   </div>
   <div className="frmgroup">
     <label htmlFor="ifsc">IFSC:</label>
     <input type="number" id="ifsc" placeholder='Enter IFSC Code' ref={employee2.ifsc} />
   </div>
   <div className="frmgroup">
     <label htmlFor="addhar">Addhar:</label>
     <input type="number" id="addhar" placeholder='Enter Addhar Card Numbder' ref={employee2.addhar} />
   </div>
   <div className="frmgroup">
        <label htmlFor="pan">pan:</label>
     <input type="text2" id="pan" placeholder='Enter Pan Card Numbder' ref={employee2.pan} />
  </div>
   <div className="frmgroup">
     <label htmlFor="type">Type:</label>
     <input type="text2" id="type" placeholder='Enter Type ' ref={employee2.type} />
   </div>
   <div className="frmgroup">
   <label htmlFor="ctc">CTC:</label>
     <input type="number" id="ctc" placeholder='Enter ctc' ref={employee2.ctc} />
   </div>
  <button className='submit' onClick={updateEmp}>Update</button>
 </form>
     </div>
        );
      default:
        return null; 
    }
  };

  return (
      <div class="parent">
            <Navbar></Navbar>
            <UserLeftSide></UserLeftSide>
    <div className='fm5'>
      <div className="contai">
        {renderForm(currentForm)}
      </div>
    </div>
    </div>
  );
};

export default EditProfile;
