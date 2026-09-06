import { useNavigate } from "react-router-dom";

function Analytics() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Applications Sent",
      value: "12",
      description: "Total applications submitted",
    },
    {
      title: "Interviews",
      value: "4",
      description: "Interviews scheduled",
    },
    {
      title: "Shortlisted",
      value: "3",
      description: "Companies shortlisted you",
    },
    {
      title: "Offers Received",
      value: "1",
      description: "Successful applications",
    },
  ];

  return (
    <main className="dashboard-main">
      <div className="dashboard-header">
        <div>
          <h1>Analytics</h1>
          <p>Track your placement progress and application performance.</p>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <h3>{stat.title}</h3>
            <h2>{stat.value}</h2>
            <p>{stat.description}</p>
          </div>
        ))}
      </section>

      <section className="analytics-section">
        <div className="analytics-card">
          <h2>Application Overview</h2>
          <p className="analytics-subtitle">
            Your current placement activity
          </p>

          <div className="progress-item">
            <div className="progress-label">
              <span>Applications</span>
              <strong>12</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "80%" }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-label">
              <span>Interviews</span>
              <strong>4</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "45%" }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-label">
              <span>Shortlisted</span>
              <strong>3</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "30%" }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-label">
              <span>Offers</span>
              <strong>1</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "15%" }}></div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h2>Placement Insights</h2>
          <p className="analytics-subtitle">
            A quick summary of your progress
          </p>

          <div className="insight-item">
            <span className="insight-icon">📊</span>
            <div>
              <h3>Application Activity</h3>
              <p>Keep applying consistently to improve your chances.</p>
            </div>
          </div>

          <div className="insight-item">
            <span className="insight-icon">🎯</span>
            <div>
              <h3>Interview Preparation</h3>
              <p>Focus on preparation to convert interviews into offers.</p>
            </div>
          </div>

          <div className="insight-item">
            <span className="insight-icon">🚀</span>
            <div>
              <h3>Keep Growing</h3>
              <p>Continue building skills and tracking your progress.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Analytics;