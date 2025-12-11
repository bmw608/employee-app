import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ IMPORTANT

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
  "https://uninntromittive-unmanoeuvred-tania.ngrok-free.dev/api/login",
  {
    email,
    password,
  }
);


if (res.data.success) {
  sessionStorage.setItem("user", JSON.stringify(res.data.user));

  // ✅ YE LINE ADD KARO (MOST IMPORTANT)
  localStorage.setItem("isLoggedIn", "true");

  navigate("/dashboard");
}

    } catch (err) {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h1 className="brand">BMW FINE SILVER</h1>
        <p className="subtitle">Payroll Login</p>

        {error && <div className="error">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
}

export default Login;
