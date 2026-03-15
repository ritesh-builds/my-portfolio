import { useEffect } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminLayout from "../components/admin/AdminLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SkillsPage from "../pages/SkillsPage";
import ProjectsPage from "../pages/ProjectsPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/admin/LoginPage";
import AdminProjectsPage from "../pages/admin/AdminProjectsPage";
import AdminMessagesPage from "../pages/admin/AdminMessagesPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="page-section centered-panel">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p className="section-copy">
        The page you requested does not exist. Use the navigation to return to the
        portfolio.
      </p>
      <NavLink className="button button-primary" to="/">
        Go Home
      </NavLink>
    </section>
  );
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/projects" replace />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
