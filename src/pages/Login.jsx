import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUsers, setSession } from "../lib/auth";

const ADMIN_EMAIL = "admin@placementpilot.com";
const ADMIN_PASSWORD = "admin123";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginType, setLoginType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
    if (location.state?.loginType === "admin") setLoginType("admin");
  }, [location.state]);

  const switchLoginType = (type) => {
    setLoginType(type);
    setError("");
    setPassword("");
    setShowPassword(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (rememberMe && loginType === "user") localStorage.setItem("rememberedEmail", normalizedEmail);
      else localStorage.removeItem("rememberedEmail");

      if (loginType === "admin") {
        if (normalizedEmail !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
          setError("Invalid admin credentials.");
          return;
        }
        const admin = { name: "Admin", email: ADMIN_EMAIL };
        localStorage.setItem("admin", JSON.stringify(admin));
        setSession({ role: "admin", email: ADMIN_EMAIL });
        localStorage.removeItem("userSession");
        navigate("/admin", { replace: true });
        return;
      }

      const users = getUsers();
      const savedUser = users.find(
        (user) => String(user.email || "").trim().toLowerCase() === normalizedEmail && user.password === password
      );

      if (!savedUser) {
        setError("Invalid email or password. Create an account first if you are new here.");
        return;
      }

      setSession({ role: "user", userId: savedUser.id, email: normalizedEmail });
      localStorage.setItem("user", JSON.stringify(savedUser));
      localStorage.setItem("userSession", JSON.stringify({ userId: savedUser.id, name: savedUser.name, email: normalizedEmail }));
      localStorage.removeItem("admin");
      navigate("/dashboard", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <section className="auth-left" aria-label="PlacementPilot introduction">
        <div className="auth-brand"><div className="auth-brand-icon" aria-hidden="true">✦</div><span>PlacementPilot</span></div>
        <div className="auth-left-content">
          <p className="auth-eyebrow">YOUR PLACEMENT COMMAND CENTER</p>
          <h1>Your career journey,<br /><span>organized.</span></h1>
          <p className="auth-description">Track applications, prepare smarter, and stay ahead of your placement goals.</p>
          <div className="auth-feature"><div className="auth-feature-icon">✓</div><div><strong>Everything in one place</strong><p>Manage applications and preparation without the chaos.</p></div></div>
          <div className="auth-feature"><div className="auth-feature-icon">◈</div><div><strong>Built for your success</strong><p>Turn placement goals into consistent daily progress.</p></div></div>
        </div>
        <p className="auth-footer">© 2026 PlacementPilot. Your journey, your success.</p>
      </section>

      <section className="auth-right">
        <div className="auth-form-wrapper">
          <div className="mobile-auth-brand"><div className="auth-brand-icon">✦</div><span>PlacementPilot</span></div>
          <div className="auth-heading">
            <p className="auth-form-eyebrow">{loginType === "admin" ? "ADMIN PORTAL" : "WELCOME BACK"}</p>
            <h2>{loginType === "admin" ? "Admin sign in" : "Sign in to your account"}</h2>
            <p>{loginType === "admin" ? "Manage your placement platform." : "Continue your placement journey."}</p>
          </div>
          <div className="login-toggle" role="tablist" aria-label="Login type">
            <button type="button" role="tab" aria-selected={loginType === "user"} className={loginType === "user" ? "active" : ""} onClick={() => switchLoginType("user")}>User Login</button>
            <button type="button" role="tab" aria-selected={loginType === "admin"} className={loginType === "admin" ? "active" : ""} onClick={() => switchLoginType("admin")}>Admin Login</button>
          </div>
          <form onSubmit={handleLogin} className="auth-form" noValidate>
            <div className="form-group"><label htmlFor="login-email">Email address</label><div className="input-wrapper"><span className="input-icon">✉</span><input id="login-email" name="email" type="email" autoComplete="email" placeholder={loginType === "admin" ? ADMIN_EMAIL : "Enter your email"} value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} required /></div></div>
            <div className="form-group"><label htmlFor="login-password">Password</label><div className="input-wrapper"><span className="input-icon">▣</span><input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} required /><button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? "Hide" : "Show"}</button></div></div>
            {loginType === "user" && <div className="form-options"><label className="remember-me"><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /><span>Remember me</span></label><button type="button" className="forgot-password" onClick={() => setError("Password reset is not connected to a backend yet.")}>Forgot password?</button></div>}
            {error && <div className="auth-error" role="alert">{error}</div>}
            <button type="submit" className="auth-submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : loginType === "admin" ? "Sign in as Admin" : "Sign in"}{!isSubmitting && <span>→</span>}</button>
          </form>
          {loginType === "user" ? <p className="auth-switch">Don&apos;t have an account? <Link to="/register">Create account</Link></p> : <p className="auth-switch admin-note">Admin access is restricted to authorized personnel.</p>}
        </div>
      </section>
    </div>
  );
}
export default Login;
