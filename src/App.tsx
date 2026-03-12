import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import ProjectsPage from './pages/projectsPage'
import AuthenticatedLayout from './components/layout/Layout'
import CodeEditorPage from './pages/CodeEditorPage'
import CodeEditorLayout from './components/layout/CodeEditorLayout'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/dashboard" element={
            <AuthenticatedLayout >
              <ProjectsPage />
            </AuthenticatedLayout>
          } />
          <Route path="/code/:id" element={
            <CodeEditorLayout>
              <CodeEditorPage />
            </CodeEditorLayout>}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
