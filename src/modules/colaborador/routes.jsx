import { Navigate } from 'react-router-dom'

import AlterarSenha from './pages/AlterarSenha'
import PrimeiroAcesso from './pages/PrimeiroAcesso'
import RecuperarSenha from './pages/RecuperarSenha'
import MeuPerfil from './pages/MeuPerfil'
import Painel from './pages/Painel'
import Login from './pages/Login'

const colaboradorRoutes = [
  { path: '', element: <Navigate to="/colaborador/login" replace /> },
  { path: 'login', element: <Login /> },
  { path: 'primeiro-acesso', element: <PrimeiroAcesso /> },
  { path: 'recuperar-senha', element: <RecuperarSenha /> },
  { path: 'perfil', element: <MeuPerfil /> },
  { path: 'alterar-senha', element: <AlterarSenha /> },
  { path: 'painel', element: <Painel /> }
]

export default colaboradorRoutes
