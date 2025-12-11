import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "../api";
import Select from "react-select";
import { showSuccess, showError } from "../utils/alert";

/* ✅ SAME DARK STYLE AS OFF DAY */
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
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#16a34a" : "transparent",
    color: state.isFocused ? "#000" : "#fff",
    cursor: "pointer",
  }),
};

export default function Advance() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    date_taken: "",
    note: "",
  });

  /* ✅ LOAD EMPLOYEES */
  useEffect(() => {
    axios
      .get("/employees")
      .then((res) => {
        setEmployees(
          res.data.map((e) => ({
            value: e.id,
            label: `${e.name} (${e.employee_code})`,
          }))
        );
      })
      .catch(() => showError("Failed to load employees ❌"));
  }, []);

  /* ✅ SUBMIT ADVANCE */
  const submit = async (e) => {
    e.preventDefault();

    if (!employee || !form.amount) {
      showError("Employee & amount required ❌");
      return;
    }

    try {
      await axios.post("/advances", {
        employee_id: employee.value,
        amount: Number(form.amount),
        date_taken: form.date_taken,
        note: form.note,
      });

      showSuccess("Advance Added ✅");
      setEmployee(null);
      setForm({ amount: "", date_taken: "", note: "" });
    } catch {
      showError("Failed to add advance ❌");
    }
  };

  return (
    <Layout>
      {/* ✅ SAME CLASSES – THEME UNTOUCHED */}
      <div className="add-employee-page">
        <form className="add-employee-card" onSubmit={submit}>
          <h2>💰 Add Advance</h2>

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
            type="number"
            placeholder="Advance Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            required
          />

          <input
            type="date"
            value={form.date_taken}
            onChange={(e) =>
              setForm({ ...form, date_taken: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Reason (optional)"
            value={form.note}
            onChange={(e) =>
              setForm({ ...form, note: e.target.value })
            }
          />

          <button type="submit">Add Advance</button>
        </form>
      </div>
    </Layout>
  );
}
