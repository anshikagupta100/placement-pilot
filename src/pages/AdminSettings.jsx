<<<<<<< HEAD
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
=======
function AdminSettings() { return <main className="dashboard-main"><h1>Admin Settings</h1><p>Configure platform settings.</p></main>; }
export default AdminSettings;
>>>>>>> d3ffe8658e9a394c5e9be2a31a0e5a7666567270
