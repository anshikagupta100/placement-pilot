import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin = useMemo(() => { try { return JSON.parse(localStorage.getItem("admin") || "{}"); } catch { return {}; } }, []);
  const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");
  const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

  return <div className="dashboard-page"><Sidebar admin /><main className="dashboard-main"><Navbar admin />
    <section className="dashboard-welcome"><p className="dashboard-eyebrow">ADMINISTRATION CENTER</p><h1>Welcome back, {admin.name || "Admin"} <span className="heading-star">✦</span></h1><p className="dashboard-subtitle">Manage users, applications, and placement activities.</p></section>
    <section className="stats-grid"><div className="stat-card"><span className="stat-icon">◎</span><p>Total users</p><h2>{users.length}</h2><small>Registered students</small></div><div className="stat-card"><span className="stat-icon">▣</span><p>Total applications</p><h2>{applications.length}</h2><small>Applications submitted</small></div><div className="stat-card"><span className="stat-icon">◇</span><p>Active jobs</p><h2>{jobs.length}</h2><small>Available opportunities</small></div></section>
    <section className="dashboard-content-grid"><div className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">PLATFORM OVERVIEW</p><h2>Placement activity</h2></div><button className="dashboard-text-button" onClick={() => navigate("/admin/analytics")}>View analytics →</button></div><div className="admin-overview-content"><div className="admin-overview-icon">◒</div><h3>{applications.length ? `${applications.length} applications tracked` : "No activity yet"}</h3><p>{applications.length ? "Review application records to monitor placement progress." : "Platform statistics and placement activity will appear here as students use PlacementPilot."}</p></div></div><div className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">MANAGEMENT</p><h2>Quick access</h2></div></div><div className="admin-management-list"><button onClick={() => navigate("/admin/users")}><span className="quick-action-icon blue">◎</span><div><strong>Manage users</strong><small>View and manage student accounts</small></div><b>→</b></button><button onClick={() => navigate("/admin/jobs")}><span className="quick-action-icon purple">▣</span><div><strong>Manage job listings</strong><small>Add and update opportunities</small></div><b>→</b></button><button onClick={() => navigate("/admin/applications")}><span className="quick-action-icon green">◈</span><div><strong>View applications</strong><small>Monitor student applications</small></div><b>→</b></button></div></div></section>
  </main></div>;
}
