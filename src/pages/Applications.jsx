import { useNavigate } from "react-router-dom";

function Applications() {
  const navigate = useNavigate();
  return <main className="dashboard-main"><h1>Applications</h1><p>Track your job applications here.</p><button onClick={() => navigate("/dashboard")}>Back to Dashboard</button></main>;
}

export default Applications;
