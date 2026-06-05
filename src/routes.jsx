import { Navigate } from 'react-router-dom'

import administradorRoutes from './modules/administrador/routes'
import cidadaoRoutes from './modules/cidadao/routes'

export const appRoutes = [
  { path: '/', element: <Navigate to="/cidadao" replace /> },
  { path: '/cidadao/*', children: cidadaoRoutes },
  { path: '/administrador/*', children: administradorRoutes },
  { path: '*', element: <Navigate to="/cidadao" replace /> }
]
