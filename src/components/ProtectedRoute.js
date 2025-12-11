import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = sessionStorage.getItem("user");

    console.log("ProtectedRoute user =>", user);

  // ❌ login nahi hai → LOGIN PAGE
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ login hai → page dikhao
  return children;
};

export default ProtectedRoute;
