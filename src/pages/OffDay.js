import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "../api";
import Select from "react-select";
import { showSuccess, showError } from "../utils/alert";

const darkSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#1e293b",
    border: "none",
    borderRadius: "10px",
    minHeight: "44px",
    boxShadow: "none",
    color: "#fff",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#020617",
    borderRadius: "10px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "#16a34a"
      : "transparent",
    color: state.isFocused ? "#000" : "#fff",
    cursor: "pointer",
  }),
};


export default function OffDay() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);

  const [form, setForm] = useState({
    date: "",
    reason: "",
  });

  useEffect(() => {
    axios
      .get("/employees")
      .then((res) => {
        const opts = res.data.map((e) => ({
          value: e.id,
          label: `${e.name} (${e.employee_code})`,
        }));
        setEmployees(opts);
      })
      .catch(() => showError("Failed to load employees ❌"));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!employee || !form.date) {
      showError("Employee & date required ❌");
      return;
    }

    try {
      await axios.post("/off", {
        employee_id: employee.value,
        date: form.date,
        reason: form.reason,
      });

      showSuccess("Off Day Added ✅");
      setEmployee(null);
      setForm({ date: "", reason: "" });
    } catch {
      showError("Failed to add off day ❌");
    }
  };

  return (
    <Layout>
      <div className="add-employee-page">
        <form className="add-employee-card" onSubmit={submit}>
          <h2>📅 Add Off Day</h2>

          {/* ✅ FIXED DROPDOWN */}
          <Select
  options={employees}
  value={employee}
  onChange={setEmployee}
  placeholder="Select Employee"
  styles={darkSelectStyles}
  menuPortalTarget={document.body}
/>


          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Reason (optional)"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />

          <button type="submit">Add Off Day</button>
        </form>
      </div>
    </Layout>
  );
}
