import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = localStorage.getItem("shareshelfUser");

    if (existingUser) {
      const user = JSON.parse(existingUser);

      if (user.email === email.trim().toLowerCase()) {
        setError("An account with this email already exists.");
        return;
      }
    }

    const user = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    localStorage.setItem(
      "shareshelfUser",
      JSON.stringify(user)
    );

    setMessage(
      "Account created successfully! You can now sign in."
    );

    setTimeout(() => {
      navigate("/signin");
    }, 1200);
  };

  return (
    <div className="auth-page">

      <button
        className="auth-back"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} />
        Back to ShareShelf
      </button>

      <div className="auth-container">

        <div>
          <div className="auth-brand">
            <div className="brand-mark">
              <span>SS</span>
            </div>

            <div>
              <div className="brand-name">
                ShareShelf
              </div>

              <div className="brand-tagline">
                Share. Reuse. Connect.
              </div>
            </div>
          </div>

          <div className="auth-heading">
            <h1>Create your account</h1>

            <p>
              Join the community and start sharing
              useful resources.
            </p>
          </div>
        </div>

        <div className="auth-card">

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {message && (
            <div className="auth-success">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="name">
                Full name
              </label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <div className="input-wrapper">
                <Mail size={18} />

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
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
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
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Enter password again"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Create account
            </button>

          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            className="create-account-btn"
            onClick={() => navigate("/signin")}
          >
            Already have an account? Sign in
          </button>

        </div>

        <p className="auth-footer">
          Your account information is stored locally
          for this development version of ShareShelf.
        </p>

      </div>
    </div>
  );
}

export default SignUp;