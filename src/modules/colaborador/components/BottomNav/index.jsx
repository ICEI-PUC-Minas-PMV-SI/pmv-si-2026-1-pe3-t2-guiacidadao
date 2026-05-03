import { useLocation, useNavigate } from 'react-router-dom'

import { navItems } from './defaultData'
import { styles } from './styles'

const icons = {
  home: (
    <path d="M3 10L10 4L17 10V16C17 16.5523 16.5523 17 16 17H12V12H8V17H4C3.44772 17 3 16.5523 3 16V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
  ),
  gift: (
    <>
      <rect x="3" y="7" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M3 11H17M10 7V18M10 7C8 4 5 5 6 7C7 9 10 7 10 7ZM10 7C12 4 15 5 14 7C13 9 10 7 10 7Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  map: (
    <path d="M10 17C10 17 4 12 4 8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8C16 12 10 17 10 17ZM10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  ),
  user: (
    <>
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M3 17C3 13.6863 6.13401 11 10 11C13.866 11 17 13.6863 17 17" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  )
}

const isActive = (path, current) => current === path || current.startsWith(`${path}/`)

const BottomNav = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <nav style={styles.bar}>
      {navItems.map((item) => (
        <button
          key={item.key}
          type="button"
          style={styles.item(isActive(item.path, pathname))}
          onClick={() => navigate(item.path)}
        >
          <svg style={styles.icon} viewBox="0 0 20 20">
            {icons[item.icon]}
          </svg>
          {item.label}
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
