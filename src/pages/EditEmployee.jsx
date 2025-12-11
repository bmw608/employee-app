import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api";
import Layout from "../components/Layout";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    employee_code: "",
    monthly_salary: "",
  });

  // LOAD EMPLOYEE
  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const res = await axios.get(`/employees/${id}`);
        setForm({
          name: res.data.name,
          employee_code: res.data.employee_code,
          monthly_salary: res.data.monthly_salary,
        });
      } catch {
        alert("Failed to load employee");
      }
    };

    loadEmployee();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // UPDATE
  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/employees/${id}`, {
  ...form,
  monthly_salary: Number(form.monthly_salary),
});


      alert("Employee updated ✅");
      navigate("/employees");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <Layout>
      <div style={styles.page}>
        <form style={styles.card} onSubmit={updateEmployee}>
          <h2 style={styles.title}>✏️ Edit Employee</h2>

          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Code</label>
          <input
            style={styles.input}
            name="employee_code"
            value={form.employee_code}
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Salary</label>
          <input
            style={styles.input}
            type="number"
            name="monthly_salary"
            value={form.monthly_salary}
            onChange={handleChange}
            required
          />

          <button style={styles.btn}>💾 Update Employee</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditEmployee;

/* =======================
   🎨 STYLES
======================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "50px",
  },

  card: {
    width: "420px",
    background: "linear-gradient(145deg, #0f172a, #020617)",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.6)",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
  },

  label: {
    fontSize: "14px",
    opacity: 0.8,
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0 18px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "#1e293b",
    color: "#fff",
    fontSize: "15px",
  },

  btn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 18px rgba(37,99,235,0.8)",
  },
};
