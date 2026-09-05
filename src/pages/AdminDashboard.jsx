import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const admin = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("admin")) || {};
    } catch {
      return {};
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      <aside className="dashboard-sidebar">

        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">✦</div>
          <span>PlacementPilot</span>
        </div>

        <div className="admin-sidebar-label">
          ADMIN PORTAL
        </div>

        <nav className="dashboard-nav">

          <button className="dashboard-nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/admin/users")}
          >
            <span>◎</span>
            User Management
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/admin/jobs")}
          >
            <span>▣</span>
            Job Management
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/admin/applications")}
          >
            <span>◈</span>
            Applications
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/admin/analytics")}
          >
            <span>◒</span>
            Analytics
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/admin/settings")}
          >
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <div className="dashboard-sidebar-bottom">

          <div className="dashboard-sidebar-tip">
            <div className="tip-icon">✦</div>
            <div>
              <strong>Admin workspace</strong>
              <p>Manage your placement platform efficiently.</p>
            </div>
          </div>

          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Log out
          </button>

        </div>

      </aside>


      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <p className="dashboard-eyebrow">
              ADMINISTRATION CENTER
            </p>

            <h1>
              Welcome back, {admin.name || "Admin"}
              <span className="heading-star">✦</span>
            </h1>

            <p className="dashboard-subtitle">
              Manage users, applications, and placement activities.
            </p>
          </div>

          <div className="dashboard-header-right">

            <button className="dashboard-icon-button">
              ⌕
            </button>

            <button className="dashboard-icon-button">
              ♢
            </button>

            <div className="dashboard-avatar admin-avatar">
              A
            </div>

          </div>

        </header>


        <section className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon blue">◎</div>

            <div>
              <p>Total Users</p>
              <h2>0</h2>
              <span>Registered students</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon purple">▣</div>

            <div>
              <p>Total Applications</p>
              <h2>0</h2>
              <span>Applications submitted</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon green">◈</div>

            <div>
              <p>Active Jobs</p>
              <h2>0</h2>
              <span>Available opportunities</span>
            </div>
          </div>

        </section>


        <section className="dashboard-content-grid">

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>
                <p className="panel-kicker">PLATFORM OVERVIEW</p>
                <h2>Placement activity</h2>
              </div>

              <button className="dashboard-text-button">
                View analytics →
              </button>

            </div>

            <div className="admin-overview-content">

              <div className="admin-overview-icon">
                ◒
              </div>

              <h3>No activity yet</h3>

              <p>
                Platform statistics and placement activity
                will appear here as students use PlacementPilot.
              </p>

            </div>

          </div>


          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>
                <p className="panel-kicker">MANAGEMENT</p>
                <h2>Quick access</h2>
              </div>

            </div>

            <div className="admin-management-list">

              <button
                onClick={() => navigate("/admin/users")}
              >
                <span className="quick-action-icon blue">◎</span>
                <div>
                  <strong>Manage users</strong>
                  <small>View and manage student accounts</small>
                </div>
                <b>→</b>
              </button>

              <button
                onClick={() => navigate("/admin/jobs")}
              >
                <span className="quick-action-icon purple">▣</span>
                <div>
                  <strong>Manage job listings</strong>
                  <small>Add and update opportunities</small>
                </div>
                <b>→</b>
              </button>

              <button
                onClick={() => navigate("/admin/applications")}
              >
                <span className="quick-action-icon green">◈</span>
                <div>
                  <strong>View applications</strong>
                  <small>Monitor student applications</small>
                </div>
                <b>→</b>
              </button>

            </div>

          </div>

        </section>


        <section className="dashboard-panel dashboard-quick-panel">

          <div className="dashboard-panel-header">

            <div>
              <p className="panel-kicker">ADMIN TOOLS</p>
              <h2>Quick actions</h2>
            </div>

          </div>

          <div className="dashboard-quick-actions">

            <button
              className="dashboard-quick-action"
              onClick={() => navigate("/admin/users")}
            >
              <div className="quick-action-icon blue">◎</div>

              <div className="quick-action-text">
                <strong>User management</strong>
                <span>Manage registered student accounts</span>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

            <button
              className="dashboard-quick-action"
              onClick={() => navigate("/admin/jobs")}
            >
              <div className="quick-action-icon purple">▣</div>

              <div className="quick-action-text">
                <strong>Job management</strong>
                <span>Create and manage job opportunities</span>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

            <button
              className="dashboard-quick-action"
              onClick={() => navigate("/admin/analytics")}
            >
              <div className="quick-action-icon green">◒</div>

              <div className="quick-action-text">
                <strong>View analytics</strong>
                <span>Monitor platform performance</span>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;