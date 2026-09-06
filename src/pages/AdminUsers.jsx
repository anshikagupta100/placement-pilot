import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const users = useMemo(() => { try { return JSON.parse(localStorage.getItem("registeredUsers") || "[]"); } catch { return []; } }, []);
  const filtered = users.filter((u) => `${u.name || ""} ${u.email || ""}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="dashboard-page"><Sidebar admin /><main className="dashboard-main"><Navbar admin /><section className="page-toolbar"><div><p className="panel-kicker">ADMINISTRATION</p><h2>User management</h2><p className="dashboard-subtitle">Review and manage student accounts.</p></div></section><section className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">REGISTERED USERS</p><h2>Student directory</h2></div><input className="table-search" placeholder="Search users" value={query} onChange={(e) => setQuery(e.target.value)} /></div>{filtered.length ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead><tbody>{filtered.map((u, i) => <tr key={i}><td>{u.name || "Student"}</td><td>{u.email || "—"}</td><td><span className="status-badge status-active">Student</span></td></tr>)}</tbody></table></div> : <div className="empty-state"><span>◎</span><h3>No registered users yet</h3><p>Student accounts will appear here after registration.</p></div>}</section></main></div>;
}
