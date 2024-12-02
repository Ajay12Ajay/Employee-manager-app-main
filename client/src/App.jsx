import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Component/Login/Login";
import User from "./Component/UserPanel/UserDashboard/User";
import Admin from "./Component/AdminPanel/AdminDashboard/Admin";
import Forms from "./Component/Forms/Forms";
import ViewEmployee from "./Component/AdminPanel/ProTable/ViewEmployee";
import PayslipTable from "./Component/AdminPanel/ProTable/Paysliptable";
import PayslipEdit from "./Component/AdminPanel/ProTable/PayslipEdit";
import UserProject from "./Component/UserPanel/UserProject/UserProject";
import Navbar from "./Component/AdminPanel/NavLeft/Navbar";
import LeftSide from "./Component/AdminPanel/NavLeft/Leftside";
import Project from "./Component/AdminPanel/Projects/Project";
import AddProject from "./Component/AdminPanel/Projects/AddProject";
import Payslip from "./Component/AdminPanel/Payslip/Payslip";
import ProjectUpdate from "./Component/AdminPanel/Projects/ProjectUpdate";
import UserFinance from "./Component/UserPanel/UserDashboard/UserFinance";
import UserProdetails from "./Component/UserPanel/UserDashboard/UserProdetails";
import EditPersonal from "./Component/AdminPanel/AdminDashboard/EditPersonal";
import EditProfile from "./Component/UserPanel/UserDashboard/EditProfile";
import EditProffesional from "./Component/AdminPanel/ProTable/EditProffesional";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem("roles")));

  useEffect(() => {
    if (!token || !roles) {
      const fetchedToken = "your_fetched_token";
      const fetchedRoles = ["ROLE_USER"];
      setToken(fetchedToken);
      setRoles(fetchedRoles);
    }
  }, [token, roles]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {token && roles ? (
        <>
          {roles.includes("ROLE_ADMIN") && (
            <>
              <Route path="/admin-dashboard" element={<Admin />} />
              <Route path="/admin/projects" element={<Project />} />
              <Route path="/admin/addProject" element={<AddProject />} />
              <Route path="/admin/payslip" element={<Payslip />} />
              <Route path="/admin/projectUpdate" element={<ProjectUpdate />} />
              <Route path="/admin/viewEmployee" element={<ViewEmployee />} />
              <Route path="/admin/finances" element={<PayslipTable />} />
              <Route path="/admin/payslipEdit" element={<PayslipEdit />} />
              <Route path="/admin/editpersonal" element={<EditPersonal />} />
              <Route
                path="/admin/editProject"
                element={<ProjectUpdate></ProjectUpdate>}
              ></Route>
              <Route
                path="/admin/editProfessional"
                element={<EditProffesional />}
              />
              <Route path="/form" element={<Forms />} />
            </>
          )}
          {!roles.includes("ROLE_ADMIN") && (
            <>
              <Route path="/user-dashboard" element={<User />} />
              <Route path="/user/project" element={<UserProject />} />
              <Route path="/user/finance" element={<UserFinance />} />
              <Route path="/user/professional" element={<UserProdetails />} />
              {/* <Route path="/user/editProfile" element={<EditProfile />} /> */}
              <Route path="/user/payslip" element={<Payslip />} />
            </>
          )}
        </>
      ) : (
        <Route path="*" element={<Navigate replace to="/login" />} />
      )}
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
