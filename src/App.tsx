import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/layout/AdminLayout";
import CodeEditorLayout from "./components/layout/CodeEditorLayout";
import AuthenticatedLayout from "./components/layout/Layout";
import CodeEditorPage from "./pages/CodeEditorPage";
import LandingPage from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import AdminAuditLogsPage from "./pages/admin/AdminAuditLogsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import ProjectsPage from "./pages/projectsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthenticatedLayout>
              <ProjectsPage />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/code/:id"
          element={
            <CodeEditorLayout>
              <CodeEditorPage />
            </CodeEditorLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <AdminUsersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/audit-logs"
          element={
            <AdminLayout>
              <AdminAuditLogsPage />
            </AdminLayout>
          }
        />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
