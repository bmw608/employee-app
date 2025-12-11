import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editSalary, setEditSalary] = useState("");

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line
  }, []);

  const loadDetails = async () => {
    try {
      const res = await axios.get(`/employees/${id}`);
      setEmployee(res.data);
      setEditSalary(res.data?.monthly_salary || "");
    } catch (err) {
      console.error("Employee details load error:", err);
      alert("Failed to load employee details");
    } finally {
      setLoading(false);
    }
  };

  const updateSalary = async () => {
    if (!window.confirm("Update salary for this employee?")) return;

    try {
      await axios.put(`/employees/${id}`, {
        monthly_salary: editSalary,
      });

      alert("Salary updated");
      loadDetails();
    } catch (err) {
      console.error("Update salary error:", err);
      alert("Failed to update salary");
    }
  };

  const deleteEmployee = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`/employees/${id}`);
      alert("Employee deleted");
      navigate("/employees");
    } catch (err) {
      console.error("Delete employee error:", err);
      alert("Failed to delete employee");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-white text-xl">
        Loading employee details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-10 text-white text-xl">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Employee Details</h1>

      <div className="bg-gray-800 p-6 rounded max-w-lg">
        <p className="mb-3">
          <span className="font-bold">ID:</span> {employee.id}
        </p>

        <p className="mb-3">
          <span className="font-bold">Employee Code:</span> {employee.employee_code}
        </p>

        <p className="mb-3">
          <span className="font-bold">Name:</span> {employee.name}
        </p>

        <p className="mb-3">
          <span className="font-bold">Monthly Salary:</span> Rs {employee.monthly_salary}
        </p>

        {/* Update Salary */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Update Salary</h2>

          <input
            type="number"
            value={editSalary}
            onChange={(e) => setEditSalary(e.target.value)}
            className="w-full bg-gray-700 p-3 rounded mb-3"
          />

          <button
            onClick={updateSalary}
            className="bg-blue-600 px-5 py-2 rounded mr-3"
          >
            Update
          </button>

          <button
            onClick={deleteEmployee}
            className="bg-red-600 px-5 py-2 rounded"
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
