import { Navigate } from 'react-router-dom'

import ConfirmarDesativacaoBeneficio from './pages/Beneficios/ConfirmarDesativacao'
import AdicionarBeneficio from './pages/Beneficios/Adicionar'
import DetalhesBeneficio from './pages/Beneficios/Detalhes'
import EditarBeneficio from './pages/Beneficios/Editar'
import ListaBeneficios from './pages/Beneficios/Lista'
import RecuperarSenha from './pages/RecuperarSenha'
import PrimeiroAcesso from './pages/PrimeiroAcesso'
import AlterarSenha from './pages/AlterarSenha'
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
  { path: 'painel', element: <Painel /> },
  { path: 'beneficios', element: <ListaBeneficios /> },
  { path: 'beneficios/novo', element: <AdicionarBeneficio /> },
  { path: 'beneficios/:beneficioId', element: <DetalhesBeneficio /> },
  { path: 'beneficios/:beneficioId/editar', element: <EditarBeneficio /> },
  { path: 'beneficios/:beneficioId/desativar', element: <ConfirmarDesativacaoBeneficio /> }
]

export default colaboradorRoutes
