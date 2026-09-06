import { useNavigate } from "react-router-dom";
function Profile() { const navigate = useNavigate(); return <main className="dashboard-main"><h1>Profile</h1><p>Manage your personal and academic details.</p><button onClick={() => navigate("/dashboard")}>Back to Dashboard</button></main>; }
export default Profile;
