import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminAnalytics() {
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");
  const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  const selected = applications.filter((a) => a.status === "Selected").length;
  const rate = applications.length ? Math.round((selected / applications.length) * 100) : 0;
  return <div className="dashboard-page"><Sidebar admin /><main className="dashboard-main"><Navbar admin /><section className="page-toolbar"><div><p className="panel-kicker">ADMINISTRATION</p><h2>Platform analytics</h2><p className="dashboard-subtitle">Monitor placement activity across the platform.</p></div></section><section className="stats-grid"><div className="stat-card"><span className="stat-icon">◎</span><p>Registered users</p><h2>{users.length}</h2><small>Total student accounts</small></div><div className="stat-card"><span className="stat-icon">▣</span><p>Job listings</p><h2>{jobs.length}</h2><small>Available opportunities</small></div><div className="stat-card"><span className="stat-icon">◈</span><p>Applications</p><h2>{applications.length}</h2><small>Total submissions</small></div><div className="stat-card"><span className="stat-icon">✓</span><p>Selection rate</p><h2>{rate}%</h2><small>Applications converted</small></div></section><section className="dashboard-panel"><p className="panel-kicker">PLATFORM INSIGHTS</p><h2>Placement performance</h2><div className="progress-item"><div className="progress-label"><span>Application activity</span><strong>{applications.length}</strong></div><div className="progress-bar"><div className="progress-fill" style={{width: `${Math.min(100, applications.length * 10)}%`}} /></div></div><div className="progress-item"><div className="progress-label"><span>Job availability</span><strong>{jobs.length}</strong></div><div className="progress-bar"><div className="progress-fill" style={{width: `${Math.min(100, jobs.length * 10)}%`}} /></div></div></section></main></div>;
}
