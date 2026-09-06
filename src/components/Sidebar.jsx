import { NavLink, useNavigate } from "react-router-dom";

const studentLinks = [
  ["⌂", "Dashboard", "/dashboard"],
  ["▣", "Applications", "/applications"],
  ["◈", "Preparation", "/preparation"],
  ["◒", "Analytics", "/analytics"],
  ["◎", "Profile", "/profile"],
];

const adminLinks = [
  ["⌂", "Dashboard", "/admin"],
  ["▣", "Applications", "/admin/applications"],
  ["▤", "Jobs", "/admin/jobs"],
  ["♙", "Users", "/admin/users"],
  ["◒", "Analytics", "/admin/analytics"],
  ["⚙", "Settings", "/admin/settings"],
];

export default function Sidebar({ admin = false }) {
  const navigate = useNavigate();
  const links = admin ? adminLinks : studentLinks;

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-brand" onClick={() => navigate(admin ? "/admin" : "/dashboard")} role="button" tabIndex={0} onKeyDown={(event) => event.key === "Enter" && navigate(admin ? "/admin" : "/dashboard")}>
        <span className="dashboard-brand-icon">✦</span>
        <span>PlacementPilot</span>
      </div>

      <p className="sidebar-section-label">{admin ? "ADMIN PORTAL" : "STUDENT PORTAL"}</p>

      <nav className="dashboard-nav" aria-label="Main navigation">
        {links.map(([icon, label, path]) => (
          <NavLink key={path} to={path} end={path === "/dashboard" || path === "/admin"} className={({ isActive }) => `dashboard-nav-item${isActive ? " active" : ""}`}>
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="dashboard-sidebar-bottom">
        <div className="dashboard-sidebar-tip">
          <span className="tip-icon">✦</span>
          <div><strong>Quick tip</strong><p>Keep your profile and resume updated to improve your opportunities.</p></div>
        </div>
        <button className="dashboard-logout" onClick={logout}><span>↪</span>Sign out</button>
      </div>
    </aside>
  );
}
