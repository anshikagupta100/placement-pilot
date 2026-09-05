import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (loginType === "admin") {
      if (
        email === "admin@placementpilot.com" &&
        password === "admin123"
      ) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem(
          "admin",
          JSON.stringify({
            name: "Admin",
            email: "admin@placementpilot.com",
          })
        );

        navigate("/admin");
      } else {
        setError("Invalid admin credentials.");
      }

      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setError("No account found. Please register first.");
      return;
    }

    if (
      email !== savedUser.email ||
      password !== savedUser.password
    ) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "user");

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-brand">
          <div className="auth-brand-icon">✦</div>
          <span>PlacementPilot</span>
        </div>

        <div className="auth-left-content">

          <p className="auth-eyebrow">
            YOUR PLACEMENT COMMAND CENTER
          </p>

          <h1>
            Your career journey,
            <br />
            <span>organized.</span>
          </h1>

          <p className="auth-description">
            Track applications, prepare smarter, and stay
            ahead of your placement goals.
          </p>

          <div className="auth-feature">
            <div className="auth-feature-icon">✓</div>
            <div>
              <strong>Everything in one place</strong>
              <p>
                Manage your applications and preparation
                without the chaos.
              </p>
            </div>
          </div>

          <div className="auth-feature">
            <div className="auth-feature-icon">◈</div>
            <div>
              <strong>Built for your success</strong>
              <p>
                Turn your placement goals into consistent
                daily progress.
              </p>
            </div>
          </div>

        </div>

        <p className="auth-footer">
          © 2026 PlacementPilot. Your journey, your success.
        </p>

      </div>


      <div className="auth-right">

        <div className="auth-form-wrapper">

          <div className="mobile-auth-brand">
            <div className="auth-brand-icon">✦</div>
            <span>PlacementPilot</span>
          </div>

          <div className="auth-heading">
            <p className="auth-form-eyebrow">
              {loginType === "admin"
                ? "ADMIN PORTAL"
                : "WELCOME BACK"}
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


          <div className="login-toggle">

            <button
              type="button"
              className={loginType === "user" ? "active" : ""}
              onClick={() => {
                setLoginType("user");
                setError("");
              }}
            >
              User Login
            </button>

            <button
              type="button"
              className={loginType === "admin" ? "active" : ""}
              onClick={() => {
                setLoginType("admin");
                setError("");
              }}
            >
              Admin Login
            </button>

          </div>


          <form onSubmit={handleLogin} className="auth-form">

            <div className="form-group">

              <label>Email address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  type="email"
                  placeholder={
                    loginType === "admin"
                      ? "admin@placementpilot.com"
                      : "Enter your email"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

            </div>


            <div className="form-group">

              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">▣</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {loginType === "user" && (
              <div className="form-options">

                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>

              </div>
            )}


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            <button type="submit" className="auth-submit">
              {loginType === "admin"
                ? "Sign in as Admin"
                : "Sign in"}
              <span>→</span>
            </button>

          </form>


          {loginType === "user" ? (
            <p className="auth-switch">
              Don't have an account?
              <Link to="/register">Create account</Link>
            </p>
          ) : (
            <p className="auth-switch admin-note">
              Admin access is restricted to authorized personnel.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Login;