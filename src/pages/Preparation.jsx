import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const initialTopics = [
  { id: 1, title: "Data Structures & Algorithms", description: "Arrays, strings, recursion, trees and problem solving.", category: "Technical", progress: 65, icon: "⌘" },
  { id: 2, title: "Core Computer Science", description: "DBMS, OS, networking and OOP fundamentals.", category: "Technical", progress: 40, icon: "◈" },
  { id: 3, title: "Aptitude & Reasoning", description: "Quantitative aptitude, logic and verbal ability.", category: "Aptitude", progress: 50, icon: "▦" },
  { id: 4, title: "Interview Preparation", description: "HR questions, mock interviews and communication.", category: "Interview", progress: 30, icon: "◉" },
  { id: 5, title: "Resume & Portfolio", description: "Improve your resume, projects and online presence.", category: "Career", progress: 75, icon: "✎" },
  { id: 6, title: "Company Research", description: "Learn about recruiters, roles and hiring processes.", category: "Career", progress: 20, icon: "◎" },
];

export default function Preparation() {
  const [topics, setTopics] = useState(() => JSON.parse(localStorage.getItem("preparationTopics") || "null") || initialTopics);
  const [category, setCategory] = useState("All");

  useEffect(() => localStorage.setItem("preparationTopics", JSON.stringify(topics)), [topics]);

  const filteredTopics = useMemo(() => category === "All" ? topics : topics.filter((topic) => topic.category === category), [topics, category]);
  const overall = Math.round(topics.reduce((sum, topic) => sum + topic.progress, 0) / topics.length);
  const completed = topics.filter((topic) => topic.progress >= 100).length;

  const updateProgress = (id, amount) => setTopics(topics.map((topic) => topic.id === id ? { ...topic, progress: Math.min(100, topic.progress + amount) } : topic));

  return <div className="dashboard-page"><Sidebar /><main className="dashboard-main"><Navbar />
    <section className="page-toolbar"><div><p className="panel-kicker">LEARNING CENTRE</p><h2>Prepare with purpose</h2><p className="dashboard-subtitle">Build the skills that help you perform confidently in placements.</p></div><button className="dashboard-primary-button" onClick={() => document.getElementById("topics")?.scrollIntoView({ behavior: "smooth" })}>Continue learning →</button></section>
    <section className="stats-grid"><div className="stat-card"><span className="stat-icon">◒</span><p>Overall progress</p><h2>{overall}%</h2><small>Across all preparation areas</small></div><div className="stat-card"><span className="stat-icon">✓</span><p>Topics completed</p><h2>{completed}/{topics.length}</h2><small>Keep making progress</small></div><div className="stat-card"><span className="stat-icon">◷</span><p>Study streak</p><h2>7 days</h2><small>Consistency builds confidence</small></div><div className="stat-card"><span className="stat-icon">★</span><p>Recommended</p><h2>DSA</h2><small>Your next focus area</small></div></section>
    <section className="dashboard-panel" id="topics"><div className="dashboard-panel-header"><div><p className="panel-kicker">YOUR ROADMAP</p><h2>Preparation areas</h2></div><select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}><option>All</option><option>Technical</option><option>Aptitude</option><option>Interview</option><option>Career</option></select></div><div className="topic-grid">{filteredTopics.map((topic) => <article className="topic-card" key={topic.id}><div className="topic-card-top"><span className="topic-icon">{topic.icon}</span><span className="topic-category">{topic.category}</span></div><h3>{topic.title}</h3><p>{topic.description}</p><div className="progress-label"><span>Progress</span><strong>{topic.progress}%</strong></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${topic.progress}%` }} /></div><button className="dashboard-secondary-button" onClick={() => updateProgress(topic.id, 10)}>{topic.progress >= 100 ? "Completed ✓" : "Mark practice complete"}</button></article>)}</div></section>
  </main></div>;
}
