import { useState } from "react";
import axios from "../api";
import Layout from "../components/Layout";
import { showError } from "../utils/alert";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Generate weekly report (last 7 days – backend controlled)
  const generateReport = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://uninntromittive-unmanoeuvred-tania.ngrok-free.dev/weekly-report");
      setReports(res.data || []);
    } catch {
      showError("Failed to generate report ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Print POS slip
  const printSlip = (id) => {
    const slip = document.getElementById(`print-${id}`);
    if (!slip) return;

    const original = document.body.innerHTML;
    document.body.innerHTML = `
      <div style="
        width:260px;
        font-family: 'Courier New', monospace;
        font-size:12px;
        padding:10px;
      ">
        ${slip.innerHTML}
      </div>
    `;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  return (
    <Layout>
      <div className="add-employee-page">
        <div className="add-employee-card" style={{ width: "95%" }}>
          <h2 style={{ marginBottom: 16 }}>📊 Weekly Payroll Report</h2>

          <button
            className="btn primary"
            onClick={generateReport}
            style={{ marginBottom: 20 }}
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>

          {reports.length === 0 && (
            <p style={{ opacity: 0.6 }}>No report generated</p>
          )}

          {reports.map((r) => {
const WEEK_DAYS = 6; // ✅ Sunday always off
const dailyRate = Math.round(r.monthly_salary / 26);

const effectiveOffDays = Math.min(r.off_days, WEEK_DAYS);
const workDays = WEEK_DAYS - effectiveOffDays;

const grossPay = dailyRate * workDays;
const netPay = grossPay - r.advance_total;


            return (
              <div
                key={r.id}
                style={{
                  background: "rgba(0,0,0,0.35)",
                  padding: 16,
                  borderRadius: 14,
                  marginBottom: 18,
                }}
              >
                {/* ✅ POS SLIP */}
                <div
                  id={`print-${r.id}`}
                  style={{
                    background: "#fff",
                    color: "#000",
                    padding: 12,
                    borderRadius: 6,
                    marginBottom: 12,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <b>BMW FINE SILVER</b>
                    <div>SALARY SLIP</div>
                    <hr />
                  </div>

                  <div>Name: {r.name}</div>
                  <div>Code: {r.employee_code}</div>
                  <div>Monthly Salary: Rs {r.monthly_salary}</div>

                  <hr />

                  <b>OFF DAYS (6 DAYS)</b>
                  <div>{r.off_days}</div>

                  <hr />

                  <b>ADVANCES (6 DAYS)</b>
                  <div>Rs {r.advance_total}</div>

                  <hr />

                  <div>Daily Rate: Rs {dailyRate}</div>
                  <div>Work Days: {workDays}</div>
                  <div>Gross Pay: Rs {grossPay}</div>
                  <div>Total Adv: Rs {r.advance_total}</div>

                  <hr />

                  <b>NET PAY: Rs {netPay}</b>

                  <hr />

                  <div style={{ textAlign: "center", fontSize: 10 }}>
                    Printed: {new Date().toLocaleString()}
                  </div>
                </div>

                <button
                  className="btn secondary"
                  onClick={() => printSlip(r.id)}
                >
                  Print Slip
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
