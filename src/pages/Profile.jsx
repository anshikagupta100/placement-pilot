import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

function Profile() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-main">
      <h1>My Profile</h1>
      <p>Manage your personal information and account details here.</p>

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </main>
  );
}

export default Profile;
=======
function Profile() { const navigate = useNavigate(); return <main className="dashboard-main"><h1>Profile</h1><p>Manage your personal and academic details.</p><button onClick={() => navigate("/dashboard")}>Back to Dashboard</button></main>; }
export default Profile;
>>>>>>> d3ffe8658e9a394c5e9be2a31a0e5a7666567270
