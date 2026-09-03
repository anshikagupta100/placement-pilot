import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    localStorage.setItem("loggedIn", "false");

    navigate("/login");
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
              START YOUR JOURNEY
            </span>

            <h1>
              One place for
              <span> your placement goals.</span>
            </h1>

            <p>
              Create your account and bring your
              applications, preparation, and career goals
              together in one organized workspace.
            </p>

            <div className="intro-features">

              <div>
                <span>✓</span>
                Organize your applications
              </div>

              <div>
                <span>✓</span>
                Build better preparation habits
              </div>

              <div>
                <span>✓</span>
                Track your progress
              </div>

            </div>

          </div>

          <p className="intro-footer">
            Your career deserves a better system.
          </p>

        </div>


        {/* RIGHT SIDE */}

        <div className="auth-form-section">

          <div className="auth-form-wrapper">

            <div className="mobile-brand">
              <div className="brand-icon">✦</div>
              <span>PlacementPilot</span>
            </div>

            <div className="form-heading">

              <h2>Create your account</h2>

              <p>
                Start organizing your placement journey.
              </p>

            </div>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            <form onSubmit={handleRegister}>

              <div className="form-group">

                <label htmlFor="name">
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="register-email">
                  Email address
                </label>

                <input
                  id="register-email"
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

                <label htmlFor="register-password">
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    id="register-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="At least 6 characters"
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


              <div className="form-group">

                <label htmlFor="confirm-password">
                  Confirm password
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />

              </div>


              <button
                type="submit"
                className="auth-submit"
              >
                Create account
              </button>

            </form>


            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>


            <Link
              to="/login"
              className="secondary-auth-btn"
            >
              Sign in instead
            </Link>


            <p className="auth-terms">
              By creating an account, you agree to our
              <span> Terms of Service</span> and
              <span> Privacy Policy</span>.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;