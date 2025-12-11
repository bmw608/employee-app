import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    if (!window.confirm("Logout?")) return;
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "#00ffcc" : "#fff",
    background: isActive ? "rgba(0,255,200,0.12)" : "transparent",
    transition: "0.3s",
  });

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>BMW Fine Silver</h2>

      <NavLink to="/dashboard" style={linkStyle}>
        📊 Dashboard
      </NavLink>

      <NavLink to="/employees" style={linkStyle}>
        👥 Employees
      </NavLink>

      <NavLink to="/add-employee" style={linkStyle}>
        ➕ Add Employee
      </NavLink>

      <NavLink to="/advance" style={linkStyle}>
        💰 Advance
      </NavLink>

      <NavLink to="/offday" style={linkStyle}>
        📅 Off Day
      </NavLink>

      <NavLink to="/weekly-report" style={linkStyle}>
        📄 Weekly Report
      </NavLink>

      <button style={styles.logout} onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "#0b1220",
    padding: "20px",
    boxShadow: "4px 0 20px rgba(0,0,0,0.6)",
  },
  logo: {
    textAlign: "center",
    color: "#00ffcc",
    marginBottom: "30px",
  },
  logout: {
    marginTop: "30px",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg,#ff416c,#ff4b2b)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
