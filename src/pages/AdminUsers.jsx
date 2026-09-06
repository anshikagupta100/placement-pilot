import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-main">
      <h1>Admin Users</h1>
      <p>Manage registered students and users here.</p>

      <button onClick={() => navigate("/admin")}>
        Back to Admin Dashboard
      </button>
    </main>
  );
}

export default AdminUsers;