import { useLocation, useNavigate } from "react-router-dom";

const titles = {
  "/dashboard": ["STUDENT OVERVIEW", "Good to see you again"],
  "/applications": ["APPLICATIONS", "Track your placement journey"],
  "/preparation": ["PREPARATION", "Build skills and get interview-ready"],
  "/analytics": ["ANALYTICS", "Understand your placement progress"],
  "/profile": ["PROFILE", "Manage your personal information"],
  "/admin": ["ADMIN OVERVIEW", "Monitor your placement ecosystem"],
  "/admin/applications": ["APPLICATIONS", "Review and manage applications"],
  "/admin/jobs": ["JOB MANAGEMENT", "Create and manage opportunities"],
  "/admin/users": ["USER MANAGEMENT", "Manage registered students"],
  "/admin/analytics": ["ANALYTICS", "View placement performance"],
  "/admin/settings": ["SETTINGS", "Configure your portal"],
};

export default function Navbar({ admin = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [eyebrow, subtitle] = titles[location.pathname] || [
    admin ? "ADMIN PORTAL" : "PLACEMENT PORTAL",
    "Manage your placement journey",
  ];

  let storedUser = {};
  try {
    storedUser = JSON.parse(localStorage.getItem(admin ? "admin" : "user")) || {};
  } catch {
    storedUser = {};
  }

  const name = storedUser.name || storedUser.fullName || (admin ? "Administrator" : "Student");
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="dashboard-header">
      <div>
        <p className="dashboard-eyebrow">{eyebrow}</p>
        <h1>{subtitle}</h1>
      </div>
      <div className="dashboard-header-right">
        <button className="dashboard-icon-button" onClick={() => window.alert("Notifications will appear here.")} aria-label="Notifications">
          ♧
        </button>
        <button className={`dashboard-avatar${admin ? " admin-avatar" : ""}`} onClick={() => navigate(admin ? "/admin/settings" : "/profile")} aria-label="Open profile">
          {initials}
        </button>
      </div>
    </header>
  );
}
