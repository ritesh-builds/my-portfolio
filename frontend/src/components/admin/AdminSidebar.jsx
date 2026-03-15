import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const { username, logout } = useAuth();

  return (
    <aside className="admin-sidebar">
      <div>
        <span className="eyebrow">Admin Dashboard</span>
        <h2>Ritesh Portfolio</h2>
        <p className="section-copy">Manage public projects and review contact messages.</p>
      </div>

      <nav className="admin-nav">
        <NavLink
          className={({ isActive }) =>
            isActive ? "admin-nav-link admin-nav-link-active" : "admin-nav-link"
          }
          to="/admin/projects"
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "admin-nav-link admin-nav-link-active" : "admin-nav-link"
          }
          to="/admin/messages"
        >
          Messages
        </NavLink>
      </nav>

      <div className="admin-meta">
        <span>Signed in as {username || "admin"}</span>
        <button className="button button-ghost" onClick={logout} type="button">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
