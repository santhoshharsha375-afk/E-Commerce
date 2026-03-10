import { useState } from "react";

const initialLogin = { email: "", password: "" };
const initialSignup = { name: "", email: "", password: "", confirm: "" };

function validateEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(value).toLowerCase());
}

// Simple password rule: at least 6 characters
function validatePassword(value) {
  return value.length >= 6;
}

function AuthModal({ open, mode, onClose }) {
  const [authMode, setAuthMode] = useState(mode || "login");
  const [loginValues, setLoginValues] = useState(initialLogin);
  const [signupValues, setSignupValues] = useState(initialSignup);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const activeValues = authMode === "login" ? loginValues : signupValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (authMode === "login") {
      setLoginValues((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignupValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (authMode === "login") {
      if (!activeValues.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(activeValues.email)) {
        newErrors.email = "Enter a valid email";
      }

      if (!activeValues.password.trim()) {
        newErrors.password = "Password is required";
      } else if (!validatePassword(activeValues.password)) {
        newErrors.password = "At least 6 characters";
      }
    } else {
      if (!activeValues.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!activeValues.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(activeValues.email)) {
        newErrors.email = "Enter a valid email";
      }

      if (!activeValues.password.trim()) {
        newErrors.password = "Password is required";
      } else if (!validatePassword(activeValues.password)) {
        newErrors.password = "At least 6 characters";
      }

      if (!activeValues.confirm.trim()) {
        newErrors.confirm = "Please confirm password";
      } else if (activeValues.confirm !== activeValues.password) {
        newErrors.confirm = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (authMode === "login") {
      console.log("Login success", loginValues);
      alert("Login successful (mock)");
      setLoginValues(initialLogin);
    } else {
      console.log("Signup success", signupValues);
      alert("Sign up successful (mock)");
      setSignupValues(initialSignup);
    }
    onClose();
  };

  const switchMode = (next) => {
    setAuthMode(next);
    setErrors({});
  };

  return (
    <div className="auth-backdrop">
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>
          ×
        </button>

        <div className="auth-tabs">
          <button
            className={
              "auth-tab" + (authMode === "login" ? " auth-tab-active" : "")
            }
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            className={
              "auth-tab" + (authMode === "signup" ? " auth-tab-active" : "")
            }
            onClick={() => switchMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {authMode === "signup" && (
            <div className="auth-field">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                value={signupValues.name}
                onChange={handleChange}
                className={errors.name ? "auth-input auth-input-error" : "auth-input"}
                placeholder="Alex Carter"
              />
              {errors.name && <p className="auth-error">{errors.name}</p>}
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={activeValues.email}
              onChange={handleChange}
              className={errors.email ? "auth-input auth-input-error" : "auth-input"}
              placeholder="you@example.com"
            />
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={activeValues.password}
              onChange={handleChange}
              className={
                errors.password ? "auth-input auth-input-error" : "auth-input"
              }
              placeholder="At least 6 characters"
            />
            {errors.password && <p className="auth-error">{errors.password}</p>}
          </div>

          {authMode === "signup" && (
            <div className="auth-field">
              <label>Confirm password</label>
              <input
                type="password"
                name="confirm"
                value={signupValues.confirm}
                onChange={handleChange}
                className={
                  errors.confirm ? "auth-input auth-input-error" : "auth-input"
                }
                placeholder="Repeat password"
              />
              {errors.confirm && <p className="auth-error">{errors.confirm}</p>}
            </div>
          )}

          <button type="submit" className="auth-submit">
            {authMode === "login" ? "Login" : "Create account"}
          </button>

          {authMode === "login" && (
            <p className="auth-hint">
              New here?{" "}
              <button
                type="button"
                className="auth-inline-link"
                onClick={() => switchMode("signup")}
              >
                Create an account
              </button>
            </p>
          )}

          {authMode === "signup" && (
            <p className="auth-hint">
              Already have an account?{" "}
              <button
                type="button"
                className="auth-inline-link"
                onClick={() => switchMode("login")}
              >
                Log in
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
