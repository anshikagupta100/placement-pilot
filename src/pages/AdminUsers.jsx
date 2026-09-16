import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getAllApplications, getUsers } from "../lib/auth";

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const users = useMemo(() => getUsers(), []);
  const applications = useMemo(() => getAllApplications(), []);
  const filtered = users.filter((u) => `${u.name || ""} ${u.email || ""}`.toLowerCase().includes(query.toLowerCase()));
  const countForUser = (id) => applications.filter((application) => application.userId === id).length;
  return <div className="dashboard-page"><Sidebar admin /><main className="dashboard-main"><Navbar admin /><section className="page-toolbar"><div><p className="panel-kicker">ADMINISTRATION</p><h2>User management</h2><p className="dashboard-subtitle">Review the student accounts using PlacementPilot.</p></div></section><section className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">REGISTERED USERS</p><h2>Student directory <small>({users.length})</small></h2></div><input className="table-search" placeholder="Search users" value={query} onChange={(e) => setQuery(e.target.value)} /></div>{filtered.length ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>Applications</th><th>Joined</th><th>Role</th></tr></thead><tbody>{filtered.map((u) => <tr key={u.id}><td><strong>{u.name || "Student"}</strong></td><td>{u.email || "—"}</td><td>{countForUser(u.id)}</td><td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td><td><span className="status-badge status-active">Student</span></td></tr>)}</tbody></table></div> : <div className="empty-state"><span>◎</span><h3>No registered users found</h3><p>Student accounts will appear here after registration.</p></div>}</section></main></div>;
}
