import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getJobs, saveJobs } from "../lib/auth";

const initialJobs = [
  { id: 1, company: "Google", role: "Software Engineer", location: "Bengaluru", type: "Full-time", stipend: "₹18–24 LPA" },
  { id: 2, company: "Microsoft", role: "Frontend Developer", location: "Hyderabad", type: "Internship", stipend: "₹50,000/month" },
  { id: 3, company: "Deloitte", role: "Analyst", location: "Pune", type: "Full-time", stipend: "₹7–10 LPA" },
];

export default function AdminJobs() {
  const [jobs, setJobs] = useState(() => getJobs().length ? getJobs() : initialJobs);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ company: "", role: "", location: "", type: "Full-time", stipend: "" });
  useEffect(() => saveJobs(jobs), [jobs]);
  const filtered = useMemo(() => jobs.filter((job) => `${job.company} ${job.role} ${job.location}`.toLowerCase().includes(query.toLowerCase())), [jobs, query]);
  const add = (event) => { event.preventDefault(); if (!form.company.trim() || !form.role.trim()) return; setJobs((current) => [...current, { ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]); setForm({ company: "", role: "", location: "", type: "Full-time", stipend: "" }); };
  const remove = (id) => setJobs((current) => current.filter((job) => job.id !== id));
  return <div className="dashboard-page"><Sidebar admin /><main className="dashboard-main"><Navbar admin /><section className="page-toolbar"><div><p className="panel-kicker">ADMINISTRATION</p><h2>Job management</h2><p className="dashboard-subtitle">Create and manage placement opportunities.</p></div></section><section className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">NEW OPPORTUNITY</p><h2>Add a job</h2></div></div><form className="inline-form" onSubmit={add}><input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required /><input placeholder="Job role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /><input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Full-time</option><option>Internship</option><option>Part-time</option><option>Contract</option></select><input placeholder="Salary / stipend" value={form.stipend} onChange={(e) => setForm({ ...form, stipend: e.target.value })} /><button className="dashboard-primary-button">Add job</button></form></section><section className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">OPPORTUNITIES</p><h2>Active job listings <small>({jobs.length})</small></h2></div><input className="table-search" placeholder="Search jobs" value={query} onChange={(e) => setQuery(e.target.value)} /></div>{filtered.length ? <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Company</th><th>Role</th><th>Location</th><th>Type</th><th>Compensation</th><th>Action</th></tr></thead><tbody>{filtered.map((job) => <tr key={job.id}><td><strong>{job.company}</strong></td><td>{job.role}</td><td>{job.location || "—"}</td><td>{job.type}</td><td>{job.stipend || "—"}</td><td><button className="table-action" onClick={() => remove(job.id)}>Delete</button></td></tr>)}</tbody></table></div> : <div className="empty-state"><span>▣</span><h3>No jobs found</h3><p>Add a new opportunity or change your search.</p></div>}</section></main></div>;
}
