import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const starterJobs = [
  { id: 1, company: "TechNova", role: "Frontend Developer Intern", location: "Remote", type: "Internship", stipend: "₹15,000/month" },
  { id: 2, company: "CloudBridge", role: "Software Engineer", location: "Bengaluru", type: "Full-time", stipend: "₹8–12 LPA" },
  { id: 3, company: "DataSphere", role: "Data Analyst Intern", location: "Hyderabad", type: "Internship", stipend: "₹20,000/month" },
];

const statusClass = (status) => status.toLowerCase().replace(" ", "-");

export default function Applications() {
  const [applications, setApplications] = useState(() => JSON.parse(localStorage.getItem("applications") || "[]"));
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: "", role: "", location: "", status: "Applied", date: new Date().toISOString().slice(0, 10) });

  useEffect(() => localStorage.setItem("applications", JSON.stringify(applications)), [applications]);

  const filtered = useMemo(() => applications.filter((item) => {
    const text = `${item.company} ${item.role} ${item.location}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (filter === "All" || item.status === filter);
  }), [applications, query, filter]);

  const addApplication = (event) => {
    event.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;
    setApplications([{ ...form, id: Date.now() }, ...applications]);
    setForm({ company: "", role: "", location: "", status: "Applied", date: new Date().toISOString().slice(0, 10) });
    setShowForm(false);
  };

  const deleteApplication = (id) => setApplications(applications.filter((item) => item.id !== id));

  const useDemoJob = (job) => {
    setForm({ company: job.company, role: job.role, location: job.location, status: "Applied", date: new Date().toISOString().slice(0, 10) });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      <main className="dashboard-main">
        <Navbar />
        <section className="page-toolbar">
          <div><p className="panel-kicker">APPLICATION TRACKER</p><h2>Your applications</h2><p className="dashboard-subtitle">Keep every opportunity organised in one place.</p></div>
          <button className="dashboard-primary-button" onClick={() => setShowForm(!showForm)}>＋ Add application</button>
        </section>

        {showForm && <form className="dashboard-panel application-form" onSubmit={addApplication}>
          <input placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
          <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Applied</option><option>Shortlisted</option><option>Interview</option><option>Selected</option><option>Rejected</option></select>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <button className="dashboard-primary-button" type="submit">Save application</button>
        </form>}

        <section className="dashboard-panel">
          <div className="dashboard-panel-header"><div><p className="panel-kicker">YOUR RECORDS</p><h2>Application history</h2></div><div className="toolbar-controls"><input placeholder="Search applications" value={query} onChange={(e) => setQuery(e.target.value)} /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Applied</option><option>Shortlisted</option><option>Interview</option><option>Selected</option><option>Rejected</option></select></div></div>
          {filtered.length === 0 ? <div className="page-empty"><div className="dashboard-empty-icon">▣</div><h3>No applications found</h3><p>Add your first application to start tracking your journey.</p></div> : <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Company</th><th>Role</th><th>Location</th><th>Status</th><th>Date</th><th></th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><strong>{item.company}</strong></td><td>{item.role}</td><td>{item.location || "—"}</td><td><span className={`status-badge ${statusClass(item.status)}`}>{item.status}</span></td><td>{item.date}</td><td><button className="table-delete-button" onClick={() => deleteApplication(item.id)}>Delete</button></td></tr>)}</tbody></table></div>}
        </section>

        <section><div className="section-heading"><div><p className="panel-kicker">EXPLORE</p><h2>Suggested opportunities</h2></div></div><div className="job-grid">{starterJobs.map((job) => <article className="job-card" key={job.id}><div className="job-card-top"><div className="company-logo">{job.company[0]}</div><span className="job-type">{job.type}</span></div><h3>{job.role}</h3><p className="job-company">{job.company}</p><p className="job-meta">⌖ {job.location} · {job.stipend}</p><button className="dashboard-secondary-button" onClick={() => useDemoJob(job)}>Track this job</button></article>)}</div></section>
      </main>
    </div>
  );
}
