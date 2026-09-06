import { useNavigate } from "react-router-dom";

function Preparation() {
  const navigate = useNavigate();

  const preparationTopics = [
    {
      title: "Technical Skills",
      description: "Practice coding, DSA, and core computer science concepts.",
      progress: 65,
    },
    {
      title: "Aptitude & Reasoning",
      description: "Improve your quantitative and logical reasoning skills.",
      progress: 45,
    },
    {
      title: "Interview Preparation",
      description: "Prepare for HR, technical, and behavioral interviews.",
      progress: 30,
    },
    {
      title: "Resume & Communication",
      description: "Build a strong resume and improve communication skills.",
      progress: 55,
    },
  ];

  return (
    <main className="dashboard-main">
      <div className="dashboard-header">
        <div>
          <h1>Preparation</h1>
          <p>Prepare smarter for your placement journey.</p>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Overall Progress</h3>
          <h2>49%</h2>
          <p>Keep improving your preparation</p>
        </div>

        <div className="stat-card">
          <h3>Topics Completed</h3>
          <h2>12</h2>
          <p>Topics completed so far</p>
        </div>

        <div className="stat-card">
          <h3>Practice Questions</h3>
          <h2>85</h2>
          <p>Questions attempted</p>
        </div>

        <div className="stat-card">
          <h3>Study Streak</h3>
          <h2>7 Days</h2>
          <p>Keep your streak going</p>
        </div>
      </section>

      <section className="analytics-section">
        <div className="analytics-card">
          <h2>Preparation Areas</h2>
          <p className="analytics-subtitle">
            Track your progress across important placement skills.
          </p>

          {preparationTopics.map((topic) => (
            <div className="progress-item" key={topic.title}>
              <div className="progress-label">
                <div>
                  <strong>{topic.title}</strong>
                  <p>{topic.description}</p>
                </div>

                <span>{topic.progress}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${topic.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="analytics-card">
          <h2>Quick Actions</h2>
          <p className="analytics-subtitle">
            Continue your preparation journey.
          </p>

          <div className="insight-item">
            <span className="insight-icon">💻</span>
            <div>
              <h3>Practice Coding</h3>
              <p>Improve your problem-solving and programming skills.</p>
            </div>
          </div>

          <div className="insight-item">
            <span className="insight-icon">📝</span>
            <div>
              <h3>Take a Mock Test</h3>
              <p>Test your knowledge and identify areas to improve.</p>
            </div>
          </div>

          <div className="insight-item">
            <span className="insight-icon">🎤</span>
            <div>
              <h3>Practice Interview</h3>
              <p>Prepare answers and build confidence for interviews.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Preparation;