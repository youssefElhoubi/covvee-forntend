import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import ProjectsPage from './pages/projectsPage'
import AuthenticatedLayout from './components/layout/Layout'
import { MOCK_PROJECTS } from './utils/MOCK_PROJECTS'
import CodeEditorPage from './pages/CodeEditorPage'
import CodeEditorLayout from './components/layout/CodeEditorLayout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/project" element={
            <AuthenticatedLayout projectData={MOCK_PROJECTS}>
              <ProjectsPage />
            </AuthenticatedLayout>
          } />
          <Route path="/code" element={
            <CodeEditorLayout projectData={[MOCK_PROJECTS[0]]}>
              <CodeEditorPage />
            </CodeEditorLayout>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
