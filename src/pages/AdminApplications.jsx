<<<<<<< HEAD
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
=======
function AdminApplications() { return <main className="dashboard-main"><h1>Admin Applications</h1><p>Manage student applications.</p></main>; }
export default AdminApplications;
>>>>>>> d3ffe8658e9a394c5e9be2a31a0e5a7666567270
