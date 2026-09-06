import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState(() => {
    return JSON.parse(localStorage.getItem("applications")) || [];
  });

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const addApplication = (event) => {
    event.preventDefault();

    if (!form.company || !form.role) {
      alert("Please enter company and role");
      return;
    }

    const newApplication = {
      id: Date.now(),
      ...form,
      date: form.date || new Date().toISOString().split("T")[0],
    };

    setApplications([...applications, newApplication]);

    setForm({
      company: "",
      role: "",
      status: "Applied",
      date: "",
    });
  };

  const deleteApplication = (id) => {
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  };

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

          <button className="dashboard-nav-item active">
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

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/analytics")}
          >
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
            <p className="dashboard-eyebrow">APPLICATION TRACKER</p>
            <h1>Applications</h1>
            <p className="dashboard-subtitle">
              Track every job application in one place.
            </p>
          </div>
        </header>

        <section className="dashboard-panel page-panel">
          <div className="dashboard-panel-header">
            <div>
              <p className="panel-kicker">NEW APPLICATION</p>
              <h2>Add application</h2>
            </div>
          </div>

          <form className="application-form" onSubmit={addApplication}>
            <input
              placeholder="Company name"
              value={form.company}
              onChange={(event) =>
                setForm({ ...form, company: event.target.value })
              }
            />

            <input
              placeholder="Job role"
              value={form.role}
              onChange={(event) =>
                setForm({ ...form, role: event.target.value })
              }
            />

            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value })
              }
            >
              <option>Applied</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(event) =>
                setForm({ ...form, date: event.target.value })
              }
            />

            <button className="dashboard-primary-button" type="submit">
              Add application
            </button>
          </form>
        </section>

        <section className="dashboard-panel page-panel">
          <div className="dashboard-panel-header">
            <div>
              <p className="panel-kicker">YOUR RECORDS</p>
              <h2>Application history</h2>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="page-empty">
              <div className="dashboard-empty-icon">▣</div>
              <h3>No applications yet</h3>
              <p>Your applications will appear here.</p>
            </div>
          ) : (
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td>{application.company}</td>
                      <td>{application.role}</td>
                      <td>
                        <span className="status-badge">
                          {application.status}
                        </span>
                      </td>
                      <td>{application.date}</td>
                      <td>
                        <button
                          className="table-delete-button"
                          onClick={() =>
                            deleteApplication(application.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Applications;