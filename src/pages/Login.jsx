import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@placementpilot.com";
const ADMIN_PASSWORD = "admin123";

function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const rememberedEmail = localStorage.getItem("rememberedEmail");
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        setRememberMe(true);
      }
    } catch {
      // Ignore storage errors so the login page still works.
    }
  }, []);

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
      if (rememberMe && loginType === "user") {
        localStorage.setItem("rememberedEmail", normalizedEmail);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      if (loginType === "admin") {
        if (
          normalizedEmail === ADMIN_EMAIL &&
          password === ADMIN_PASSWORD
        ) {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("role", "admin");
          localStorage.setItem(
            "admin",
            JSON.stringify({
              name: "Admin",
              email: ADMIN_EMAIL,
            })
          );
          localStorage.removeItem("userSession");
          navigate("/admin", { replace: true });
          return;
        }

        setError("Invalid admin credentials.");
        return;
      }

      let savedUser = null;
      try {
        savedUser = JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        savedUser = null;
      }

      if (!savedUser) {
        setError("No account found. Please create an account first.");
        return;
      }

      const savedEmail = String(savedUser.email || "").trim().toLowerCase();
      const savedPassword = String(savedUser.password || "");

      if (normalizedEmail !== savedEmail || password !== savedPassword) {
        setError("Invalid email or password.");
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", "user");
      localStorage.setItem(
        "userSession",
        JSON.stringify({
          name: savedUser.name || "",
          email: savedEmail,
        })
      );
      localStorage.removeItem("admin");

      navigate("/dashboard", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <section className="auth-left" aria-label="PlacementPilot introduction">
        <div className="auth-brand">
          <div className="auth-brand-icon" aria-hidden="true">
            ✦
          </div>
          <span>PlacementPilot</span>
        </div>

        <div className="auth-left-content">
          <p className="auth-eyebrow">YOUR PLACEMENT COMMAND CENTER</p>

          <h1>
            Your career journey,
            <br />
            <span>organized.</span>
          </h1>

          <p className="auth-description">
            Track applications, prepare smarter, and stay ahead of your
            placement goals.
          </p>

          <div className="auth-feature">
            <div className="auth-feature-icon" aria-hidden="true">
              ✓
            </div>
            <div>
              <strong>Everything in one place</strong>
              <p>Manage applications and preparation without the chaos.</p>
            </div>
          </div>

          <div className="auth-feature">
            <div className="auth-feature-icon" aria-hidden="true">
              ◈
            </div>
            <div>
              <strong>Built for your success</strong>
              <p>Turn placement goals into consistent daily progress.</p>
            </div>
          </div>
        </div>

        <p className="auth-footer">
          © 2026 PlacementPilot. Your journey, your success.
        </p>
      </section>

      <section className="auth-right">
        <div className="auth-form-wrapper">
          <div className="mobile-auth-brand">
            <div className="auth-brand-icon" aria-hidden="true">
              ✦
            </div>
            <span>PlacementPilot</span>
          </div>

          <div className="auth-heading">
            <p className="auth-form-eyebrow">
              {loginType === "admin" ? "ADMIN PORTAL" : "WELCOME BACK"}
            </p>

            <h2>
              {loginType === "admin"
                ? "Admin sign in"
                : "Sign in to your account"}
            </h2>

            <p>
              {loginType === "admin"
                ? "Manage your placement platform."
                : "Continue your placement journey."}
            </p>
          </div>

          <div className="login-toggle" role="tablist" aria-label="Login type">
            <button
              type="button"
              role="tab"
              aria-selected={loginType === "user"}
              className={loginType === "user" ? "active" : ""}
              onClick={() => switchLoginType("user")}
            >
              User Login
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={loginType === "admin"}
              className={loginType === "admin" ? "active" : ""}
              onClick={() => switchLoginType("admin")}
            >
              Admin Login
            </button>
          </div>

          <form onSubmit={handleLogin} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="login-email">Email address</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  ✉
                </span>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={
                    loginType === "admin"
                      ? "admin@placementpilot.com"
                      : "Enter your email"
                  }
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  ▣
                </span>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    loginType === "admin" ? "current-password" : "current-password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {loginType === "user" && (
              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setError("Password reset is not connected yet.")
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting
                ? "Signing in..."
                : loginType === "admin"
                  ? "Sign in as Admin"
                  : "Sign in"}
              {!isSubmitting && <span>→</span>}
            </button>
          </form>

          {loginType === "user" ? (
            <p className="auth-switch">
              Don&apos;t have an account?
              <Link to="/register">Create account</Link>
            </p>
          ) : (
            <p className="auth-switch admin-note">
              Admin access is restricted to authorized personnel.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Login;
