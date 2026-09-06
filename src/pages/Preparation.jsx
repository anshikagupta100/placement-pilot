import { useNavigate } from "react-router-dom";
function Preparation() { const navigate = useNavigate(); return <main className="dashboard-main"><h1>Preparation</h1><p>Plan and manage your placement preparation.</p><button onClick={() => navigate("/dashboard")}>Back to Dashboard</button></main>; }
export default Preparation;
