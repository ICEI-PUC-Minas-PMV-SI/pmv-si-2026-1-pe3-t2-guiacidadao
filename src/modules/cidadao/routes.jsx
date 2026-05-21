import { Navigate } from 'react-router-dom'

import MeusBeneficios from './pages/MeusBeneficios'
import PerfilFamiliar from './pages/PerfilFamiliar'

const cidadaoRoutes = [
  { path: '', element: <Navigate to="/cidadao/perfil-familiar" replace /> },
  { path: 'perfil-familiar', element: <PerfilFamiliar /> },
  { path: 'meus-beneficios', element: <MeusBeneficios /> },
  { path: '*', element: <Navigate to="/cidadao/perfil-familiar" replace /> }
]

export default cidadaoRoutes
