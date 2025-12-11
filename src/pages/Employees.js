import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import Layout from "../components/Layout";
import AlertPopup from "../components/AlertPopup";
import * as XLSX from "xlsx";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [popup, setPopup] = useState(null); // ✅ YAHAN ADD KARO
  const navigate = useNavigate();

  const loadEmployees = async () => {
    const res = await axios.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    const ok = window.confirm("Delete this employee?");
    if (!ok) return;
    await axios.delete(`/employees/${id}`);
    loadEmployees();
  };


// ✅ EXCEL DOWNLOAD (PER EMPLOYEE)
const downloadExcel = async (id) => {
  try {
    // employee object nikaal
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;

    const res = await axios.post(
      "/employees/excel",
      {
        id: emp.id,
        name: emp.name,
        employee_code: emp.employee_code,
        monthly_salary: emp.monthly_salary,
      },
      { responseType: "blob" }
    );

    // file download
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${emp.name}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error(err);
    // yahan tumhara popup use karo
    alert("Excel export failed ❌");
  }
};



  return (
    <Layout>
      <div style={styles.page}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2>👥 Employees</h2>
          <button
            style={styles.addBtn}
            onClick={() => navigate("/add-employee")}
          >
            ➕ Add Employee
          </button>
        </div>

        {/* TABLE */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Code</th>
                <th style={styles.th}>Salary</th>
                <th style={{ ...styles.th, textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, styles.rowHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, styles.rowLeave)
                  }
                >
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.employee_code}</td>
                  <td style={styles.td}>Rs {emp.monthly_salary}</td>

                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <button
                      style={styles.editBtn}
                      onClick={() =>
                        navigate(`/edit-employee/${emp.id}`)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      🗑 Delete
                    </button>

                    <button
                      style={styles.excelBtn}
                      onClick={() => downloadExcel(emp.id)}
                    >
                      📥 Excel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ✅ POPUP — YAHAN */}
{popup && (
  <AlertPopup
    type={popup.type}
    message={popup.message}
    onClose={() => setPopup(null)}
  />
)}
    </Layout>
  );
};

export default Employees;

/* =======================
   🎨 ORIGINAL VVVIP THEME
======================= */
const styles = {
  page: { padding: "24px" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  addBtn: {
    background: "#22c55e",
    color: "#000",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 18px rgba(34,197,94,0.8)",
  },

  card: {
    background: "linear-gradient(145deg, #020617, #0f172a)",
    borderRadius: "20px",
    padding: "12px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.7)",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  },

  th: {
    padding: "12px 22px",
    opacity: 0.8,
    textAlign: "left",
  },

  td: {
    padding: "14px 22px",
  },

  row: {
    background: "rgba(15,23,42,0.9)",
    borderRadius: "16px",
    transition: "all 0.25s ease",
  },

  rowHover: {
    boxShadow: "0 0 0 2px #38bdf8, 0 0 30px rgba(56,189,248,0.9)",
    transform: "scale(1.01)",
  },

  rowLeave: {
    boxShadow: "none",
    transform: "scale(1)",
  },

  editBtn: {
    marginRight: "8px",
    padding: "6px 14px",
    borderRadius: "9px",
    border: "none",
    background: "#38bdf8",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteBtn: {
    marginRight: "8px",
    padding: "6px 14px",
    borderRadius: "9px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  excelBtn: {
    padding: "6px 14px",
    borderRadius: "9px",
    border: "none",
    background: "#22c55e",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
