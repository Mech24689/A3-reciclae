import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contato from './pages/Contato'
import DiasDeColeta from './pages/DiasDeColeta'
import Login from './pages/Login'
import PontosDeColeta from './pages/PontosDeColeta'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/DiasDeColeta" element={<DiasDeColeta />} />
      <Route path="/PontosDeColeta" element={<PontosDeColeta />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Registrar" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
