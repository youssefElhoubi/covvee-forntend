import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import ProjectsPage from './pages/projectsPage'

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<RegisterPage/>} />
          <Route path="/project" element={<ProjectsPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
