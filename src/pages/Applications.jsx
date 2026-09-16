import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getAllApplications, getCurrentUser, getJobs, saveApplications } from "../lib/auth";

const fallbackJobs = [
  { id: 1, company: "TechNova", role: "Frontend Developer Intern", location: "Remote", type: "Internship", stipend: "₹15,000/month" },
  { id: 2, company: "CloudBridge", role: "Software Engineer", location: "Bengaluru", type: "Full-time", stipend: "₹8–12 LPA" },
  { id: 3, company: "DataSphere", role: "Data Analyst Intern", location: "Hyderabad", type: "Internship", stipend: "₹20,000/month" },
];

const statusClass = (status) => String(status || "Applied").toLowerCase().replace(/\s+/g, "-");

export default function Applications() {
  const user = getCurrentUser();
  const userId = user?.id;
  const [applications, setApplications] = useState(() => getAllApplications().filter((item) => item.userId === userId));
  const [jobs, setJobs] = useState(() => getJobs());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ company: "", role: "", location: "", status: "Applied", date: new Date().toISOString().slice(0, 10), notes: "" });

  useEffect(() => setJobs(getJobs()), []);

  const persist = (nextForUser) => {
    const all = getAllApplications();
    const legacyOthers = all.filter((item) => item.userId && item.userId !== userId);
    saveApplications([...legacyOthers, ...nextForUser]);
    setApplications(nextForUser);
  };

  const filtered = useMemo(() => applications.filter((item) => {
    const text = `${item.company} ${item.role} ${item.location}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (filter === "All" || item.status === filter);
  }), [applications, query, filter]);

  const resetForm = () => {
    setForm({ company: "", role: "", location: "", status: "Applied", date: new Date().toISOString().slice(0, 10), notes: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const submitApplication = (event) => {
    event.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;
    if (editingId) {
      persist(applications.map((item) => item.id === editingId ? { ...item, ...form } : item));
    } else {
      persist([{ ...form, id: crypto.randomUUID(), userId, student: user?.name || "Student", createdAt: new Date().toISOString() }, ...applications]);
    }
    resetForm();
  };

  const editApplication = (application) => {
    setEditingId(application.id);
    setForm({ company: application.company || "", role: application.role || "", location: application.location || "", status: application.status || "Applied", date: application.date || "", notes: application.notes || "" });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteApplication = (id) => persist(applications.filter((item) => item.id !== id));

  const trackJob = (job) => {
    setForm({ company: job.company, role: job.role, location: job.location, status: "Applied", date: new Date().toISOString().slice(0, 10), notes: "" });
    setEditingId(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const suggestedJobs = jobs.length ? jobs : fallbackJobs;

  return <div className="dashboard-page"><Sidebar /><main className="dashboard-main"><Navbar />
    <section className="page-toolbar"><div><p className="panel-kicker">APPLICATION TRACKER</p><h2>Your applications</h2><p className="dashboard-subtitle">Keep every opportunity organised in one place.</p></div><button className="dashboard-primary-button" onClick={() => setShowForm((current) => !current)}>{showForm ? "Close form" : "＋ Add application"}</button></section>
    {showForm && <form className="dashboard-panel application-form" onSubmit={submitApplication}><div className="form-heading-row"><div><p className="panel-kicker">{editingId ? "EDIT APPLICATION" : "NEW APPLICATION"}</p><h2>{editingId ? "Update opportunity" : "Track a new opportunity"}</h2></div></div><div className="application-form-grid"><label>Company<input placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required /></label><label>Role<input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></label><label>Location<input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label><label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Applied</option><option>Shortlisted</option><option>Interview</option><option>Selected</option><option>Rejected</option></select></label><label>Date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label><label className="span-two">Notes<textarea rows="2" placeholder="Interview date, recruiter, next step..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label></div><div className="form-actions"><button type="button" className="dashboard-secondary-button" onClick={resetForm}>Cancel</button><button className="dashboard-primary-button" type="submit">{editingId ? "Save changes" : "Save application"}</button></div></form>}
    <section className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">YOUR RECORDS</p><h2>Application history</h2></div><div className="toolbar-controls"><input placeholder="Search applications" value={query} onChange={(e) => setQuery(e.target.value)} /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Applied</option><option>Shortlisted</option><option>Interview</option><option>Selected</option><option>Rejected</option></select></div></div>{filtered.length === 0 ? <div className="page-empty"><div className="dashboard-empty-icon">▣</div><h3>No applications found</h3><p>Add your first application or search for another status.</p><button className="dashboard-primary-button" onClick={() => setShowForm(true)}>Add application</button></div> : <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Company</th><th>Role</th><th>Location</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><strong>{item.company}</strong></td><td>{item.role}</td><td>{item.location || "—"}</td><td><span className={`status-badge ${statusClass(item.status)}`}>{item.status}</span></td><td>{item.date || "—"}</td><td className="table-actions"><button className="table-action" onClick={() => editApplication(item)}>Edit</button><button className="table-delete-button" onClick={() => deleteApplication(item.id)}>Delete</button></td></tr>)}</tbody></table></div>}</section>
    <section><div className="section-heading"><div><p className="panel-kicker">EXPLORE</p><h2>Suggested opportunities</h2></div></div><div className="job-grid">{suggestedJobs.map((job) => <article className="job-card" key={job.id}><div className="job-card-top"><div className="company-logo">{job.company[0]}</div><span className="job-type">{job.type}</span></div><h3>{job.role}</h3><p className="job-company">{job.company}</p><p className="job-meta">⌖ {job.location || "Location not specified"} {job.stipend ? `· ${job.stipend}` : ""}</p><button className="dashboard-secondary-button" onClick={() => trackJob(job)}>Track this job</button></article>)}</div></section>
  </main></div>;
}
