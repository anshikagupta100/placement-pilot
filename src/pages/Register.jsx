import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { getUsers, saveUsers } from "../lib/auth";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    setError("");
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanName) return setError("Please enter your full name.");
    if (password.length < 6) return setError("Password must contain at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    const users = getUsers();
    if (users.some((user) => String(user.email).toLowerCase() === cleanEmail)) {
      return setError("An account with this email already exists.");
    }

    const user = { id: crypto.randomUUID(), name: cleanName, email: cleanEmail, password, createdAt: new Date().toISOString() };
    saveUsers([...users, user]);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/login", { replace: true, state: { registered: true } });
  };

  return <div className="auth-page"><div className="auth-container"><section className="auth-intro"><div className="brand"><div className="brand-icon">✦</div><span>PlacementPilot</span></div><div className="intro-content"><span className="eyebrow">START YOUR JOURNEY</span><h1>One place for<span> your placement goals.</span></h1><p>Create your account and bring your applications, preparation, and career goals together in one organized workspace.</p><div className="intro-features"><div><span>✓</span>Organize your applications</div><div><span>✓</span>Build better preparation habits</div><div><span>✓</span>Track your progress</div></div></div><p className="intro-footer">Your career deserves a better system.</p></section><section className="auth-form-section"><div className="auth-form-wrapper"><div className="mobile-brand"><div className="brand-icon">✦</div><span>PlacementPilot</span></div><div className="form-heading"><span className="eyebrow">CREATE ACCOUNT</span><h2>Create your account</h2><p>Start organizing your placement journey.</p></div>{error && <div className="auth-error" role="alert">{error}</div>}<form onSubmit={handleRegister}><div className="form-group"><label htmlFor="name">Full name</label><input id="name" type="text" autoComplete="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required /></div><div className="form-group"><label htmlFor="register-email">Email address</label><input id="register-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div><div className="form-group"><label htmlFor="register-password">Password</label><div className="password-wrapper"><input id="register-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div></div><div className="form-group"><label htmlFor="confirm-password">Confirm password</label><input id="confirm-password" type="password" autoComplete="new-password" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div><button type="submit" className="auth-submit">Create account</button></form><div className="auth-divider">Already have an account?</div><Link to="/login" className="secondary-auth-btn">Sign in instead</Link><p className="auth-terms">By creating an account, you agree to our Terms of Service and Privacy Policy.</p></div></section></div></div>;
}
export default Register;
