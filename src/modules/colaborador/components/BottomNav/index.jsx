import { useLocation, useNavigate } from 'react-router-dom'

import { IconBeneficio, IconHome, IconPerfil, IconUnidade } from '../Icons'
import { navItems } from './defaultData'
import { styles } from './styles'

const iconMap = {
  home: IconHome,
  beneficio: IconBeneficio,
  unidade: IconUnidade,
  perfil: IconPerfil
}

const isActive = (path, current) => current === path || current.startsWith(`${path}/`)

const BottomNav = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <nav style={styles.bar}>
      {navItems.map((item) => {
        const Icon = iconMap[item.icon]
        return (
          <button
            key={item.key}
            type="button"
            style={styles.item(isActive(item.path, pathname))}
            onClick={() => navigate(item.path)}
          >
            <Icon size={20} />
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav
