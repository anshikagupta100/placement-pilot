import { useNavigate } from "react-router-dom";

function AdminJobs() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-main">
      <h1>Admin Jobs</h1>
      <p>Manage job listings here.</p>

      <button onClick={() => navigate("/admin")}>
        Back to Admin Dashboard
      </button>
    </main>
  );
}

export default AdminJobs;