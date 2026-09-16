import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getAllApplications } from "../lib/auth";

export default function AdminApplications() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const applications = useMemo(() => getAllApplications(), []);
  const filtered = applications.filter((application) => {
    const text = `${application.student || "Student"} ${application.company || ""} ${application.role || ""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "All" || (application.status || "Applied") === status);
  });
  return <div className="dashboard-page"><Sidebar admin /><main className="dashboard-main"><Navbar admin /><section className="page-toolbar"><div><p className="panel-kicker">ADMINISTRATION</p><h2>Application management</h2><p className="dashboard-subtitle">Review student applications and their current status.</p></div></section><section className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">APPLICATION RECORDS</p><h2>All applications <small>({applications.length})</small></h2></div><div className="toolbar-controls"><input placeholder="Search student, company or role" value={query} onChange={(e) => setQuery(e.target.value)} /><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>Applied</option><option>Shortlisted</option><option>Interview</option><option>Selected</option><option>Rejected</option></select></div></div>{filtered.length ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Student</th><th>Company</th><th>Role</th><th>Location</th><th>Status</th><th>Date</th></tr></thead><tbody>{filtered.map((a) => <tr key={a.id}><td><strong>{a.student || "Student"}</strong><small>{a.userId || ""}</small></td><td>{a.company || "—"}</td><td>{a.role || "—"}</td><td>{a.location || "—"}</td><td><span className={`status-badge status-${String(a.status || "Applied").toLowerCase()}`}>{a.status || "Applied"}</span></td><td>{a.date || "—"}</td></tr>)}</tbody></table></div> : <div className="empty-state"><span>▣</span><h3>No applications found</h3><p>Try changing the search or status filter.</p></div>}</section></main></div>;
}
