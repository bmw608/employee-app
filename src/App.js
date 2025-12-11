import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


// PAGES
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Advance from "./pages/Advance";
import OffDay from "./pages/OffDay";
import Reports from "./pages/Reports";
import SalarySlip from "./pages/SalarySlip";

// PROTECTION
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />


        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEES */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />

        {/* ADVANCE */}
        <Route
          path="/advance"
          element={
            <ProtectedRoute>
              <Advance />
            </ProtectedRoute>
          }
        />

        {/* OFF DAY */}
        <Route
          path="/offday"
          element={
            <ProtectedRoute>
              <OffDay />
            </ProtectedRoute>
          }
        />

        {/* WEEKLY REPORT */}
        <Route
          path="/weekly-report"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* SALARY SLIP */}
        <Route
          path="/salary-slip/:id"
          element={
            <ProtectedRoute>
              <SalarySlip />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
