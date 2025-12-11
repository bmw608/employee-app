import React from "react";

const AlertPopup = ({ show, type = "success", message, onClose }) => {
  if (!show) return null;

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
  };

  return (
    <div style={overlay}>
      <div style={{ ...box, borderColor: colors[type] }}>
        <h3 style={{ color: colors[type], marginBottom: 10 }}>
          {type === "success" ? "✅ Success" : "❌ Error"}
        </h3>
        <p>{message}</p>
        <button onClick={onClose} style={btn}>OK</button>
      </div>
    </div>
  );
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const box = {
  background: "#0f172a",
  color: "#fff",
  padding: 24,
  width: 320,
  borderRadius: 12,
  border: "2px solid",
  textAlign: "center",
};

const btn = {
  marginTop: 15,
  padding: "8px 20px",
  background: "#38bdf8",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

export default AlertPopup;
