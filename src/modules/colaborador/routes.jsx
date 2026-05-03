import { Navigate } from 'react-router-dom'

import AlterarSenha from './pages/AlterarSenha'
import PrimeiroAcesso from './pages/PrimeiroAcesso'
import RecuperarSenha from './pages/RecuperarSenha'
import MeuPerfil from './pages/MeuPerfil'
import Login from './pages/Login'

const Placeholder = ({ label }) => (
  <main style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
    <h1 style={{ fontSize: 18, color: '#1a2332' }}>{label}</h1>
    <p style={{ fontSize: 14, color: '#64748b' }}>Em construção.</p>
  </main>
)

const colaboradorRoutes = [
  { path: '', element: <Navigate to="/colaborador/login" replace /> },
  { path: 'login', element: <Login /> },
  { path: 'primeiro-acesso', element: <PrimeiroAcesso /> },
  { path: 'recuperar-senha', element: <RecuperarSenha /> },
  { path: 'perfil', element: <MeuPerfil /> },
  { path: 'alterar-senha', element: <AlterarSenha /> },
  { path: 'painel', element: <Placeholder label="Painel do Colaborador" /> }
]

export default colaboradorRoutes
