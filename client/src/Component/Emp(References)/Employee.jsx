import React, { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        id: "",
        name: "",
        img: "",
        ctc: "",
    });
    const [editEmployeeId, setEditEmployeeId] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:9000/allEmployee");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/delete/${id}`);
            console.log("Employee deleted successfully");
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const updateEmployee = async (updatedEmployee) => {
        try {
            await axios.put(`http://localhost:9000/update/${updatedEmployee.id}`, updatedEmployee);
            console.log("Employee updated successfully");
            setEditEmployeeId(null); // Exit edit mode after successful update
            fetchEmployees();
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const handleEditClick = (id) => {
        setEditEmployeeId(id); // Set the edit mode for the specific employee
    };

    const handleSaveEdit = (employee) => {
        updateEmployee(employee); // Trigger the update operation
    };

    const handleInputChange = (event, employee) => {
        const { name, value } = event.target;
        const updatedEmployee = { ...employee, [name]: value };
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
                emp.id === employee.id ? updatedEmployee : emp
            )
        );
    };

    const handleAddEmployee = async () => {
        try {
            await axios.post("http://localhost:9000/save", newEmployee);
            console.log("Employee added successfully");
            setNewEmployee({
                id: "",
                name: "",
                img: "",
                ctc: "",
            });
            fetchEmployees();
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    const handleNewEmployeeChange = (event) => {
        const { name, value } = event.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    return (
        <div>
            <h2>Employee List</h2>
            <table border={1} align="center" cellSpacing={10} cellPadding={10}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>CTC</th>
                        <th>Allowances</th>
                        <th>Basic Salary</th>
                        <th>Net Salary</th>
                        <th>HRA</th>
                        <th>PF</th>
                        <th>TDS</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>
                                {editEmployeeId === employee.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={employee.name}
                                        onChange={(e) => handleInputChange(e, employee)}
                                    />
                                ) : (
                                    employee.name
                                )}
                            </td>
                            <td>
                                <img
                                    src={employee.img}
                                    alt={`Image of ${employee.name}`}
                                    style={{ width: "50px", height: "50px" }}
                                />
                            </td>
                            <td>{employee.ctc}</td>
                            <td>{employee.allowances}</td>
                            <td>{employee.basicsalary}</td>
                            <td>{employee.net_salary}</td>
                            <td>{employee.hra}</td>
                            <td>{employee.pf}</td>
                            <td>{employee.tds}</td>
                            <td>
                                {editEmployeeId === employee.id ? (
                                    <button onClick={() => handleSaveEdit(employee)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEditClick(employee.id)}>Edit</button>
                                )}
                                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New Employee</h2>
            <form onSubmit={handleAddEmployee}>
                <label>
                    ID:
                    <input
                        type="text"
                        name="id"
                        value={newEmployee.id}
                        onChange={handleNewEmployeeChange}
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newEmployee.name}
                        onChange={handleNewEmployeeChange}
                        required
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="img"
                        value={newEmployee.img}
                        onChange={handleNewEmployeeChange}
                        required
                    />
                </label>
                <label>
                    CTC:
                    <input
                        type="text"
                        name="ctc"
                        value={newEmployee.ctc}
                        onChange={handleNewEmployeeChange}
                        required
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default Employees;
