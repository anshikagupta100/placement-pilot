import { useNavigate } from "react-router-dom";

function AdminApplications() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-main">
      <h1>Admin Applications</h1>
      <p>Manage student job applications here.</p>

      <button onClick={() => navigate("/admin")}>
        Back to Admin Dashboard
      </button>
    </main>
  );
}

export default AdminApplications;