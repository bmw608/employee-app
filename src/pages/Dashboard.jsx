import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import Layout from "../components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ USER CHECK
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // ✅ DASHBOARD STATS (numbers only)
  const [stats, setStats] = useState({
    total_employees: 0,
    week_off_days: 0,
    week_advances: 0,
  });

  // ✅ LOAD DASHBOARD DATA
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await axios.get("/dashboard-summary");

        setStats({
          total_employees: Number(res.data.total_employees || 0),
          week_off_days: Number(res.data.week_off_days || 0),
          week_advances: Number(res.data.week_advances || 0),
        });
      } catch (err) {
        console.error("Dashboard summary error", err);
      }
    };

    loadDashboard();
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
  const ok = window.confirm("Are you sure you want to logout?");
  if (!ok) return;

  sessionStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn"); // ✅ ADD THIS

  navigate("/", { replace: true });
};


  if (!user) return null;

  return (
    <Layout>
      <div style={styles.container}>
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <div>
            <h2 style={{ margin: 0 }}>Welcome, {user.name} 👋</h2>
            <p style={{ opacity: 0.7 }}>{user.email}</p>
          </div>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>

        {/* STAT CARDS */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={styles.icon}>👥</div>
            <span>Total Employees</span>
            <h1>{stats.total_employees}</h1>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>📅</div>
            <span>Off Days (Week)</span>
            <h1>{stats.week_off_days}</h1>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>💰</div>
            <span>Advances (Week)</span>
            <h1>Rs {stats.week_advances}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

/* =======================
   🎨 STYLES
======================= */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.06)",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "30px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
  },

  logoutBtn: {
    background: "#ff4757",
    border: "none",
    padding: "12px 26px",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    borderRadius: "10px",
    fontWeight: "bold",
    boxShadow: "0 0 18px rgba(255,71,87,0.8)",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: "24px",
  },

  card: {
    background: "linear-gradient(145deg, #0f172a, #020617)",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  },

  icon: {
    fontSize: "34px",
    marginBottom: "10px",
  },
};
