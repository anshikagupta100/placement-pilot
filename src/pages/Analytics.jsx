import { useNavigate } from "react-router-dom";
function Analytics() { const navigate = useNavigate(); return <main className="dashboard-main"><h1>Analytics</h1><p>View your placement progress and insights.</p><button onClick={() => navigate("/dashboard")}>Back to Dashboard</button></main>; }
export default Analytics;
