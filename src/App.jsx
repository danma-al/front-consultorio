import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Footer from './components/Footer'

import PaginaInicio from './pages/PaginaInicio'
import ConsultaPaciente from './pages/ConsultaPaciente'
import LoginMedico from './pages/LoginMedico'
import DashboardMedico from './pages/DashboardMedico'
import RegistroMedico from './pages/RegistroMedico'

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/consulta" element={<ConsultaPaciente />} />
        <Route path="/medico-login" element={<LoginMedico />} />
        <Route path="/dashboard-medico" element={<DashboardMedico />} />
         <Route path="/registro-medico" element={<RegistroMedico />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
