export function showSuccess(message) {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #0b1220;
      padding: 25px;
      border-radius: 12px;
      color: #00ff87;
      text-align: center;
      z-index: 9999;
      box-shadow: 0 0 30px rgba(0,255,135,0.4);
      min-width: 280px;
    ">
      ✅ ${message}
      <br/><br/>
      <button id="okBtn" style="
        padding: 8px 20px;
        border: none;
        border-radius: 6px;
        background: #00ff87;
        color: #000;
        cursor: pointer;
        font-weight: bold;
      ">OK</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("okBtn").onclick = () => {
    document.body.removeChild(popup);
  };
}
