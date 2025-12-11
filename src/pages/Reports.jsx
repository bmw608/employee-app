import Layout from "../components/Layout";

export default function Reports() {
  return (
    <Layout>
      <div style={{ padding: "20px", color: "#fff" }}>
        <h2>📊 Weekly Report</h2>

        <p style={{ opacity: 0.8 }}>
          Select employee and generate weekly salary report.
        </p>

        <div
          style={{
            marginTop: "20px",
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "500px",
          }}
        >
          <label>Employee</label>
          <select style={inputStyle}>
            <option>Select Employee</option>
            <option>Sameer (E001)</option>
            <option>Altaf (E002)</option>
          </select>

          <label>Week</label>
          <input type="date" style={inputStyle} />

          <button style={btnStyle}>
            📄 Generate Report
          </button>

          <button style={outlineBtn}>
            🖨 Print Salary Slip
          </button>
        </div>
      </div>
    </Layout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#00e676",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "10px",
};

const outlineBtn = {
  ...btnStyle,
  background: "transparent",
  color: "#00e676",
  border: "1px solid #00e676",
};
