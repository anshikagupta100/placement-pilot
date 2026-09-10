import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const initialTopics = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Arrays, strings, recursion, trees and problem solving.",
    category: "Technical",
    progress: 65,
    icon: "⌘",
  },
  {
    id: 2,
    title: "Core Computer Science",
    description: "DBMS, OS, networking and OOP fundamentals.",
    category: "Technical",
    progress: 40,
    icon: "◈",
  },
  {
    id: 3,
    title: "Aptitude & Reasoning",
    description: "Quantitative aptitude, logic and verbal ability.",
    category: "Aptitude",
    progress: 50,
    icon: "▦",
  },
  {
    id: 4,
    title: "Interview Preparation",
    description: "HR questions, mock interviews and communication.",
    category: "Interview",
    progress: 30,
    icon: "◉",
  },
  {
    id: 5,
    title: "Resume & Portfolio",
    description: "Improve your resume, projects and online presence.",
    category: "Career",
    progress: 75,
    icon: "✎",
  },
  {
    id: 6,
    title: "Company Research",
    description: "Learn about recruiters, roles and hiring processes.",
    category: "Career",
    progress: 20,
    icon: "◎",
  },
];

const categories = ["All", "Technical", "Aptitude", "Interview", "Career"];

export default function Preparation() {
  const [topics, setTopics] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("preparationTopics") || "null") || initialTopics;
    } catch {
      return initialTopics;
    }
  });
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: "", description: "", category: "Technical" });

  useEffect(() => {
    localStorage.setItem("preparationTopics", JSON.stringify(topics));
  }, [topics]);

  const filteredTopics = useMemo(
    () => category === "All" ? topics : topics.filter((topic) => topic.category === category),
    [topics, category]
  );

  const overall = topics.length
    ? Math.round(topics.reduce((sum, topic) => sum + topic.progress, 0) / topics.length)
    : 0;
  const completed = topics.filter((topic) => topic.progress >= 100).length;
  const nextTopic = [...topics].sort((a, b) => a.progress - b.progress)[0];

  const updateProgress = (id) => {
    setTopics((current) =>
      current.map((topic) =>
        topic.id === id
          ? { ...topic, progress: Math.min(100, topic.progress + 10) }
          : topic
      )
    );
  };

  const addTopic = (event) => {
    event.preventDefault();
    if (!newTopic.title.trim()) return;

    setTopics((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTopic.title.trim(),
        description: newTopic.description.trim() || "A custom preparation goal for your placement journey.",
        category: newTopic.category,
        progress: 0,
        icon: "✦",
      },
    ]);
    setNewTopic({ title: "", description: "", category: "Technical" });
    setShowModal(false);
  };

  return (
    <div className="dashboard-page preparation-page">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <section className="preparation-hero">
          <div className="preparation-hero-copy">
            <span className="preparation-overline">YOUR LEARNING ROADMAP</span>
            <h2>Build skills. <span>Get interview-ready.</span></h2>
            <p>
              Turn your placement preparation into a clear daily plan. Practice,
              track progress, and know exactly what to focus on next.
            </p>
            <div className="preparation-hero-actions">
              <button className="dashboard-primary-button" onClick={() => document.getElementById("preparation-topics")?.scrollIntoView({ behavior: "smooth" })}>
                Continue learning <span>→</span>
              </button>
              <button className="preparation-outline-button" onClick={() => setShowModal(true)}>
                + Add custom topic
              </button>
            </div>
          </div>

          <div className="preparation-score-card">
            <div className="score-ring" style={{ "--progress": `${overall * 3.6}deg` }}>
              <div>
                <strong>{overall}%</strong>
                <span>overall</span>
              </div>
            </div>
            <div>
              <p>Preparation score</p>
              <strong>{overall >= 75 ? "Excellent momentum" : overall >= 50 ? "Good momentum" : "Let's build momentum"}</strong>
              <span>Keep showing up every day.</span>
            </div>
          </div>
        </section>

        <section className="preparation-stats">
          <article className="preparation-stat-card">
            <div className="preparation-stat-icon blue">◒</div>
            <div><span>Overall progress</span><strong>{overall}%</strong><small>Across all learning areas</small></div>
          </article>
          <article className="preparation-stat-card">
            <div className="preparation-stat-icon green">✓</div>
            <div><span>Topics completed</span><strong>{completed}<em>/{topics.length}</em></strong><small>Keep making progress</small></div>
          </article>
          <article className="preparation-stat-card">
            <div className="preparation-stat-icon purple">◷</div>
            <div><span>Study streak</span><strong>7<em> days</em></strong><small>Consistency builds confidence</small></div>
          </article>
          <article className="preparation-stat-card">
            <div className="preparation-stat-icon orange">★</div>
            <div><span>Next focus</span><strong className="focus-value">{nextTopic?.title || "Start a topic"}</strong><small>{nextTopic ? `${nextTopic.progress}% complete` : "Add your first goal"}</small></div>
          </article>
        </section>

        <section className="preparation-focus-panel">
          <div className="focus-copy">
            <span className="preparation-overline">TODAY'S FOCUS</span>
            <h3>{nextTopic ? `Make progress on ${nextTopic.title}` : "Choose your first preparation goal"}</h3>
            <p>{nextTopic ? nextTopic.description : "Add a topic to start building your personalized preparation roadmap."}</p>
          </div>
          <div className="focus-progress">
            <div className="focus-progress-top"><span>Current progress</span><strong>{nextTopic?.progress || 0}%</strong></div>
            <div className="focus-progress-bar"><span style={{ width: `${nextTopic?.progress || 0}%` }} /></div>
            <button className="dashboard-secondary-button" disabled={!nextTopic} onClick={() => nextTopic && updateProgress(nextTopic.id)}>
              {nextTopic?.progress >= 100 ? "Completed ✓" : "Complete 10% practice"}
            </button>
          </div>
        </section>

        <section className="dashboard-panel preparation-topics-panel" id="preparation-topics">
          <div className="preparation-topics-header">
            <div>
              <span className="preparation-overline">YOUR ROADMAP</span>
              <h2>Preparation areas</h2>
              <p>Work through each area and build confidence step by step.</p>
            </div>
            <button className="preparation-add-button" onClick={() => setShowModal(true)}>+ New topic</button>
          </div>

          <div className="preparation-filters">
            {categories.map((item) => (
              <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
            <span className="topic-count">{filteredTopics.length} {filteredTopics.length === 1 ? "topic" : "topics"}</span>
          </div>

          <div className="preparation-topic-grid">
            {filteredTopics.map((topic) => (
              <article className="preparation-topic-card" key={topic.id}>
                <div className="topic-card-heading">
                  <div className="preparation-topic-icon">{topic.icon}</div>
                  <span className="preparation-category">{topic.category}</span>
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className="topic-progress-meta"><span>Progress</span><strong>{topic.progress}%</strong></div>
                <div className="topic-progress-bar"><span style={{ width: `${topic.progress}%` }} /></div>
                <div className="topic-card-footer">
                  <span>{topic.progress >= 100 ? "Ready for interview" : `${100 - topic.progress}% remaining`}</span>
                  <button onClick={() => updateProgress(topic.id)} disabled={topic.progress >= 100}>
                    {topic.progress >= 100 ? "Completed ✓" : "Practice +10%"}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="preparation-empty-state">
              <div>✦</div>
              <h3>No topics in this category</h3>
              <p>Add a custom preparation topic to expand your roadmap.</p>
              <button className="dashboard-primary-button" onClick={() => setShowModal(true)}>Add a topic</button>
            </div>
          )}
        </section>
      </main>

      {showModal && (
        <div className="preparation-modal-backdrop" onMouseDown={() => setShowModal(false)}>
          <form className="preparation-modal" onSubmit={addTopic} onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-heading">
              <div><span className="preparation-overline">PERSONALIZE</span><h2>Add preparation topic</h2><p>Create a goal that matters for your placement.</p></div>
              <button type="button" className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <label>Topic name<input autoFocus value={newTopic.title} onChange={(event) => setNewTopic({ ...newTopic, title: event.target.value })} placeholder="e.g. JavaScript fundamentals" required /></label>
            <label>Description<textarea value={newTopic.description} onChange={(event) => setNewTopic({ ...newTopic, description: event.target.value })} placeholder="What do you want to improve?" rows="3" /></label>
            <label>Category<select value={newTopic.category} onChange={(event) => setNewTopic({ ...newTopic, category: event.target.value })}><option>Technical</option><option>Aptitude</option><option>Interview</option><option>Career</option></select></label>
            <div className="modal-actions"><button type="button" className="preparation-outline-button" onClick={() => setShowModal(false)}>Cancel</button><button className="dashboard-primary-button" type="submit">Create topic</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
