import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getAllApplications, getJobs, getUsers } from "../lib/auth";

export default function AdminAnalytics() {
  const applications = getAllApplications();
  const jobs = getJobs();
  const users = getUsers();
  const selected = applications.filter((a) => a.status === "Selected").length;
  const interviews = applications.filter((a) => ["Interview", "Selected"].includes(a.status)).length;
  const shortlisted = applications.filter((a) => ["Shortlisted", "Interview", "Selected"].includes(a.status)).length;
  const rate = applications.length ? Math.round((selected / applications.length) * 100) : 0;
  const shortlistRate = applications.length ? Math.round((shortlisted / applications.length) * 100) : 0;
  const interviewRate = applications.length ? Math.round((interviews / applications.length) * 100) : 0;
  return <div className="dashboard-page"><Sidebar admin /><main className="dashboard-main"><Navbar admin /><section className="page-toolbar"><div><p className="panel-kicker">ADMINISTRATION</p><h2>Platform analytics</h2><p className="dashboard-subtitle">Monitor placement activity across the platform.</p></div></section><section className="stats-grid"><div className="stat-card"><span className="stat-icon">◎</span><p>Registered users</p><h2>{users.length}</h2><small>Total student accounts</small></div><div className="stat-card"><span className="stat-icon">▣</span><p>Job listings</p><h2>{jobs.length}</h2><small>Available opportunities</small></div><div className="stat-card"><span className="stat-icon">◈</span><p>Applications</p><h2>{applications.length}</h2><small>Total submissions</small></div><div className="stat-card"><span className="stat-icon">✓</span><p>Selection rate</p><h2>{rate}%</h2><small>Applications selected</small></div></section><section className="analytics-section"><div className="analytics-card"><p className="panel-kicker">APPLICATION FUNNEL</p><h2>Platform performance</h2>{[["Applications", applications.length, 100], ["Shortlisted", shortlisted, shortlistRate], ["Interviews", interviews, interviewRate], ["Selected", selected, rate]].map(([label, value, width]) => <div className="progress-item" key={label}><div className="progress-label"><span>{label}</span><strong>{value}</strong></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(100, width)}%` }} /></div></div>)}</div><div className="analytics-card"><p className="panel-kicker">AT A GLANCE</p><h2>Current activity</h2><div className="admin-insight-list"><div><strong>{users.length}</strong><span>students registered</span></div><div><strong>{jobs.length}</strong><span>active opportunities</span></div><div><strong>{applications.length}</strong><span>applications tracked</span></div><div><strong>{selected}</strong><span>selected candidates</span></div></div></div></section></main></div>;
}
