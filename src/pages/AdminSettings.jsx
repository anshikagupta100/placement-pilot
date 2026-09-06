import { useNavigate } from "react-router-dom";

function AdminSettings() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-main">
      <h1>Admin Settings</h1>
      <p>Manage platform settings here.</p>

      <button onClick={() => navigate("/admin")}>
        Back to Admin Dashboard
      </button>
    </main>
  );
}

export default AdminSettings;