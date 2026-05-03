import { Navigate } from 'react-router-dom'

import administradorRoutes from './modules/administrador/routes'
import colaboradorRoutes from './modules/colaborador/routes'
import cidadaoRoutes from './modules/cidadao/routes'

export const appRoutes = [
  { path: '/', element: <Navigate to="/colaborador/login" replace /> },
  { path: '/colaborador/*', children: colaboradorRoutes },
  { path: '/cidadao/*', children: cidadaoRoutes },
  { path: '/administrador/*', children: administradorRoutes },
  { path: '*', element: <Navigate to="/colaborador/login" replace /> }
]
