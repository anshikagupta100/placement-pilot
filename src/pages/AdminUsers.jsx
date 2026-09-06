<<<<<<< HEAD
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
=======
function AdminUsers() { return <main className="dashboard-main"><h1>Admin Users</h1><p>Manage registered users.</p></main>; }
export default AdminUsers;
>>>>>>> d3ffe8658e9a394c5e9be2a31a0e5a7666567270
