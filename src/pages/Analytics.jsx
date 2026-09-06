import { useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Analytics() {
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");
  const preparation = JSON.parse(localStorage.getItem("preparationTopics") || "[]");
  const total = applications.length;
  const shortlisted = applications.filter((item) => ["Shortlisted", "Interview", "Selected"].includes(item.status)).length;
  const interviews = applications.filter((item) => ["Interview", "Selected"].includes(item.status)).length;
  const selected = applications.filter((item) => item.status === "Selected").length;
  const preparationProgress = useMemo(() => preparation.length ? Math.round(preparation.reduce((sum, item) => sum + item.progress, 0) / preparation.length) : 0, [preparation]);
  const conversion = total ? Math.round((shortlisted / total) * 100) : 0;

  const metrics = [
    ["Applications sent", total, "Total opportunities tracked", "▣"],
    ["Shortlisted", shortlisted, "Applications moving forward", "◇"],
    ["Interviews", interviews, "Interview-stage opportunities", "◎"],
    ["Offers received", selected, "Successful applications", "✓"],
  ];

  return <div className="dashboard-page"><Sidebar /><main className="dashboard-main"><Navbar />
    <section className="page-toolbar"><div><p className="panel-kicker">PERFORMANCE CENTRE</p><h2>Your placement analytics</h2><p className="dashboard-subtitle">Understand your progress and focus on what matters next.</p></div></section>
    <section className="stats-grid">{metrics.map(([title, value, text, icon]) => <div className="stat-card" key={title}><span className="stat-icon">{icon}</span><p>{title}</p><h2>{value}</h2><small>{text}</small></div>)}</section>
    <section className="analytics-section"><div className="analytics-card"><div className="dashboard-panel-header"><div><p className="panel-kicker">APPLICATION FUNNEL</p><h2>Application overview</h2></div><span className="analytics-percent">{conversion}% conversion</span></div>{[["Applications", total, 100], ["Shortlisted", shortlisted, total ? conversion : 0], ["Interviews", interviews, total ? Math.round((interviews / total) * 100) : 0], ["Offers", selected, total ? Math.round((selected / total) * 100) : 0]].map(([label, value, width]) => <div className="progress-item" key={label}><div className="progress-label"><span>{label}</span><strong>{value}</strong></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(100, width)}%` }} /></div></div>)}</div><div className="analytics-card"><p className="panel-kicker">LEARNING PROGRESS</p><h2>Preparation readiness</h2><div className="analytics-ring" style={{ "--progress": `${preparationProgress * 3.6}deg` }}><strong>{preparationProgress}%</strong><span>Ready</span></div><p className="analytics-subtitle">Keep improving your preparation areas to become interview-ready.</p><div className="insight-item"><span className="insight-icon">↗</span><div><h3>Next best action</h3><p>{total ? "Review your pending applications and prepare for upcoming interviews." : "Add your first application to start generating insights."}</p></div></div></div></section>
  </main></div>;
}
