import { useNavigate } from "react-router-dom";

function Analytics() {
  const navigate = useNavigate();

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const selected = applications.filter(
    (application) => application.status === "Selected"
  ).length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const preparationProgress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">✦</div>
          <span>PlacementPilot</span>
        </div>

        <nav className="dashboard-nav">
          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/applications")}
          >
            <span>▣</span>
            Applications
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/preparation")}
          >
            <span>◈</span>
            Preparation
          </button>

          <button className="dashboard-nav-item active">
            <span>◒</span>
            Analytics
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/profile")}
          >
            <span>◎</span>
            Profile
          </button>
        </nav>

        <div className="dashboard-sidebar-bottom">
          <button className="dashboard-logout" onClick={logout}>
            <span>↪</span>
            Log out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">PROGRESS INSIGHTS</p>
            <h1>Analytics</h1>
            <p className="dashboard-subtitle">
              Understand your placement progress.
            </p>
          </div>
        </header>

        <section className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon blue">▣</div>
            <div>
              <p>Total applications</p>
              <h2>{applications.length}</h2>
              <span>Tracked applications</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon purple">◈</div>
            <div>
              <p>Interviews</p>
              <h2>{interviews}</h2>
              <span>Interview opportunities</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon green">✓</div>
            <div>
              <p>Selected</p>
              <h2>{selected}</h2>
              <span>Successful applications</span>
            </div>
          </div>
        </section>

        <section className="dashboard-content-grid">
          <div className="dashboard-panel page-panel">
            <p className="panel-kicker">APPLICATION STATUS</p>
            <h2>Application overview</h2>

            <div className="analytics-list">
              {[
                "Applied",
                "Shortlisted",
                "Interview",
                "Selected",
                "Rejected",
              ].map((status) => {
                const count = applications.filter(
                  (application) => application.status === status
                ).length;

                return (
                  <div className="analytics-row" key={status}>
                    <span>{status}</span>
                    <strong>{count}</strong>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dashboard-panel page-panel">
            <p className="panel-kicker">PREPARATION PROGRESS</p>
            <h2>Task completion</h2>

            <div className="analytics-progress">
              <div
                className="analytics-progress-bar"
                style={{ width: `${preparationProgress}%` }}
              />
            </div>

            <h3>{preparationProgress}% completed</h3>

            <p>
              Complete your preparation tasks regularly to improve your
              placement readiness.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Analytics;