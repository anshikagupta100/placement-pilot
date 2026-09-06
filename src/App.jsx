import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Preparation from "./pages/Preparation";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";
import AdminJobs from "./pages/AdminJobs";
import AdminUsers from "./pages/AdminUsers";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";

function ProtectedRoute({ children, role }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const userRole = localStorage.getItem("role") || "user";

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to={userRole === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute role="user"><Applications /></ProtectedRoute>} />
        <Route path="/preparation" element={<ProtectedRoute role="user"><Preparation /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute role="user"><Analytics /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute role="user"><Profile /></ProtectedRoute>} />

        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute role="admin"><AdminApplications /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute role="admin"><AdminJobs /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute role="admin"><AdminAnalytics /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
