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
import IsAdmin from "./components/protection/IsAdmin";
import IsLoged from "./components/protection/IsLoged";
import IsUser from "./components/protection/IsUser";

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
            <IsLoged>
              <IsUser>
                <AuthenticatedLayout>
                  <ProjectsPage />
                </AuthenticatedLayout>
              </IsUser>
            </IsLoged>
          }
        />
        <Route
          path="/code/:id"
          element={
            <IsLoged>
              <IsUser>
                <CodeEditorLayout>
                  <CodeEditorPage />
                </CodeEditorLayout>
              </IsUser>
            </IsLoged>
          }
        />
        <Route
          path="/admin"
          element={
            <IsLoged>
              <IsAdmin>
                <AdminLayout>
                  <AdminDashboardPage />
                </AdminLayout>
              </IsAdmin>
            </IsLoged>
          }
        />
        <Route
          path="/admin/users"
          element={
            <IsLoged>
              <IsAdmin>
                <AdminLayout>
                  <AdminUsersPage />
                </AdminLayout>
              </IsAdmin>
            </IsLoged>
          }
        />
        <Route
          path="/admin/audit-logs"
          element={
            <IsLoged>
              <IsAdmin>
                <AdminLayout>
                  <AdminAuditLogsPage />
                </AdminLayout>
              </IsAdmin>
            </IsLoged>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
