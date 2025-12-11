import { useState } from "react";
import axios from "../api";
import "./AddEmployee.css";
import Layout from "../components/Layout";
import { showSuccess, showError } from "../utils/alert";


export default function AddEmployee() {
const [form, setForm] = useState({
  name: "",
  employee_code: "",   // ✅ FIX
  email: "",
  monthly_salary: ""
});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const submit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("/employees", {
      ...form,
      monthly_salary: Number(form.monthly_salary),
    });

    showSuccess("Employee Added ✅");
    setForm({
      name: "",
      employee_code: "",
      email: "",
      monthly_salary: "",
    });
  } catch (err) {
    showError("Failed to add employee ❌");
    console.error(err);
  }
};

  return (
  <Layout>
    <div className="add-employee-page">
      <form className="add-employee-card" onSubmit={submit}>
        <h2>Add Employee</h2>

        <input
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
          required
        />

<input
  name="employee_code"
  placeholder="Employee Code"
  value={form.employee_code}
  onChange={handleChange}
  required
/>


        <input
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="monthly_salary"
          placeholder="Monthly Salary"
          type="number"
          value={form.monthly_salary}
          onChange={handleChange}
          required
        />

        <button>Add Employee</button>
      </form>
    </div>
  </Layout>
);

}
