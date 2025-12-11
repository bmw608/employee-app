import React, { useEffect, useState } from "react";
import axios from "axios";

const SalarySlip = () => {
  const [employee, setEmployee] = useState({});
  const [offDays, setOffDays] = useState([]);
  const [advances, setAdvances] = useState([]);

  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    if (!id) return;

    axios.get(`/salary-slip/${id}`).then((res) => {
      setEmployee(res.data.employee || {});
      setOffDays(res.data.off_days || []);
      setAdvances(res.data.advances || []);
    });
  }, [id]);

  /* =====================================
      ✅ SALARY SYSTEM LOGIC (AS YOU SAID)
     ===================================== */

  const monthlySalary = Number(employee.monthly_salary || 0);

  // employee kitne din aya (week / month)
  const presentDays = Number(employee.work_days || 0);

  // total advance (array se bhi calculate)
  const totalAdvance = advances.reduce(
    (sum, a) => sum + Number(a.amount || 0),
    0
  );

  // system rule: month = 26 working days
  const dailyRate = monthlySalary / 26;

  // gross = jitna kaam kiya
  const grossPay = dailyRate * presentDays;

  // net pay = gross - advance (minus allow nahi)
  const netPay = Math.max(grossPay - totalAdvance, 0);

  /* =====================================
      ✅ THERMAL POS PRINT (NO EXTRA SPACE)
     ===================================== */
  const thermalPrint = () => {
    const content = document.querySelector(".slip-box").innerHTML;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
            @page { size: 80mm auto; margin: 0; }
            body {
              margin: 0;
              padding: 0;
              font-family: monospace;
              background: white;
            }
            .slip-box {
              width: 80mm;
              margin: 0;
              padding: 0;
              font-size: 11px;
              line-height: 16px;
            }
            img { display: block; margin: 0 auto 6px auto; width: 45px; }
            .center { text-align: center; }
            .divider { border-bottom: 1px dashed black; margin: 8px 0; }
            .section { font-weight: bold; text-align: center; margin-bottom: 4px; }
          </style>
        </head>
        <body>
          <div class="slip-box">${content}</div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 300);
  };

  /* =====================================
      ✅ UI
     ===================================== */

  return (
    <div style={{ textAlign: "center" }}>
      <style>
        {`
          body { background: #0f1520; }
          .slip-box {
            width: 80mm;
            margin: 20px auto;
            padding: 12px;
            background: white;
            font-family: monospace;
            font-size: 12px;
            line-height: 18px;
            color: black;
            border-radius: 6px;
          }
          .center { text-align: center; }
          .divider { border-bottom: 1px dashed black; margin: 10px 0; }
          .section { font-weight: bold; text-align: center; text-decoration: underline; }
          .print-btn { margin-top: 20px; }
          @media print { .print-btn { display: none; } }
        `}
      </style>

      {/* PRINT BUTTON */}
      <button
        className="print-btn"
        onClick={thermalPrint}
        style={{
          padding: "10px 24px",
          background: "#27ae60",
          border: "none",
          color: "white",
          fontWeight: "bold",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        PRINT SALARY SLIP
      </button>

      {/* SLIP */}
      <div className="slip-box">


<div
  style={{
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
    letterSpacing: "1px",
    marginBottom: "4px"
  }}
>
  BMW FINE SILVER
</div>

<div style={{ textAlign: "center", fontWeight: "bold" }}>
  SALARY SLIP
</div>


        <div className="divider"></div>

        <div>Name: {employee.name || "-"}</div>
        <div>Code: {employee.employee_code || "-"}</div>
        <div>Monthly Salary: Rs {monthlySalary.toFixed(0)}</div>

        <div className="divider"></div>

        <div className="section">OFF DAYS</div>
        {offDays.length ? offDays.map((d, i) => (
          <div key={i}>{d.date}</div>
        )) : <div>None</div>}

        <div className="divider"></div>

        <div className="section">ADVANCES</div>
        {advances.length ? advances.map((a, i) => (
          <div key={i}>
            Rs {a.amount} — {a.created_at?.split("T")[0]}
          </div>
        )) : <div>None</div>}

        <div className="divider"></div>

        <div>DAILY RATE: Rs {dailyRate.toFixed(0)}</div>
        <div>WORK DAYS: {presentDays}</div>
        <div>GROSS PAY: Rs {grossPay.toFixed(0)}</div>
        <div>TOTAL ADV: Rs {totalAdvance}</div>
        <div><strong>NET PAY: Rs {netPay.toFixed(0)}</strong></div>

        <div className="divider"></div>

        <div className="center">
          Printed: {new Date().toLocaleDateString()} —{" "}
          {new Date().toLocaleTimeString()}
        </div>

      </div>
    </div>
  );
};

export default SalarySlip;
