import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const savedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    if (
      email !== savedUser.email ||
      password !== savedUser.password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem("loggedIn", "true");

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {}

        <div className="auth-intro">

          <div className="brand">
            <div className="brand-icon">✦</div>
            <span>PlacementPilot</span>
          </div>

          <div className="intro-content">

            <span className="eyebrow">
              YOUR PLACEMENT COMMAND CENTER
            </span>

            <h1>
              Take control of
              <span> your placement journey.</span>
            </h1>

            <p>
              Track applications, prepare for interviews,
              and stay organized throughout your placement season.
            </p>

            <div className="intro-features">

              <div>
                <span>✓</span>
                Track every application
              </div>

              <div>
                <span>✓</span>
                Monitor your preparation
              </div>

              <div>
                <span>✓</span>
                Never miss an opportunity
              </div>

            </div>

          </div>

          <p className="intro-footer">
            Built for students who are serious about their careers.
          </p>

        </div>


        {}

        <div className="auth-form-section">

          <div className="auth-form-wrapper">

            <div className="mobile-brand">
              <div className="brand-icon">✦</div>
              <span>PlacementPilot</span>
            </div>

            <div className="form-heading">

              <h2>Welcome back</h2>

              <p>
                Sign in to continue to your dashboard.
              </p>

            </div>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            <form onSubmit={handleLogin}>

              <div className="form-group">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>


              <div className="form-group">

                <div className="label-row">

                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() =>
                      alert(
                        "Password reset will be added later."
                      )
                    }
                  >
                    Forgot password?
                  </button>

                </div>


                <div className="password-wrapper">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              <button
                type="submit"
                className="auth-submit"
              >
                Sign in
              </button>

            </form>


            <div className="auth-divider">
              <span>New to PlacementPilot?</span>
            </div>


            <Link
              to="/register"
              className="secondary-auth-btn"
            >
              Create an account
            </Link>


            <p className="auth-terms">
              By continuing, you agree to our
              <span> Terms of Service</span> and
              <span> Privacy Policy</span>.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;