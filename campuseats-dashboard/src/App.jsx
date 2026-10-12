import { NavLink, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider, useAuth } from "./features/auth/AuthContext";
import "./App.css";

function NavigationHeader() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-brand">
        <Link to="/" className="brand-title">CampusEats</Link>
        <span className="brand-badge">Cloud Live</span>
      </div>

      <nav className="header-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Menu
        </NavLink>
        <NavLink
          to="/order"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Place Order
        </NavLink>
      </nav>

      <div className="header-auth">
        {isAuthenticated ? (
          <div className="user-profile">
            <span className="user-pill">{user?.name ? `${user.name} (${user.email})` : user?.email}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-actions">
            <NavLink to="/login" className="login-link">
              Sign In
            </NavLink>
            <NavLink to="/register" className="register-btn">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <NavigationHeader />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </AuthProvider>
  );
}

