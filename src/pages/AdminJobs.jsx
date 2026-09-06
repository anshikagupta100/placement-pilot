<<<<<<< HEAD
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
=======
function AdminJobs() { return <main className="dashboard-main"><h1>Admin Jobs</h1><p>Manage job listings.</p></main>; }
export default AdminJobs;
>>>>>>> d3ffe8658e9a394c5e9be2a31a0e5a7666567270
