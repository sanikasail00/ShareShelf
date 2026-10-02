import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const savedUser = JSON.parse(
      localStorage.getItem("shareshelfUser")
    );

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    if (
      savedUser.email !== email ||
      savedUser.password !== password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem(
      "shareshelfLoggedIn",
      "true"
    );

    navigate("/");
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

        <div className="auth-brand">
          <div className="brand-mark">
            <span>SS</span>
          </div>

          <div>
            <div className="brand-name">ShareShelf</div>
            <div className="brand-tagline">
              Share. Reuse. Connect.
            </div>
          </div>
        </div>

        <div className="auth-card">

          <div className="auth-heading">
            <h1>Welcome back</h1>
            <p>
              Sign in to manage your shared resources
              and requests.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

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
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
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

            <button
              type="submit"
              className="auth-submit"
            >
              Sign in
            </button>

          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            className="create-account-btn"
            onClick={() => navigate("/signup")}
          >
            <UserPlus size={18} />
            Create a new account
          </button>

        </div>

        <p className="auth-footer">
          By using ShareShelf, you agree to use the
          platform responsibly and respect the community.
        </p>

      </div>
    </div>
  );
}

export default SignIn;