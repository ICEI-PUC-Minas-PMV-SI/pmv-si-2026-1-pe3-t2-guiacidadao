import { useNavigate } from 'react-router-dom'

import { styles } from './styles'

const Header = ({ title, subtitle, hero, initials, onBack, brand = 'GuiaCidadão' }) => {
  const navigate = useNavigate()
  const handleBack = onBack ?? (() => navigate(-1))

  if (hero) {
    return (
      <header style={styles.hero}>
        <div style={styles.heroRow}>
          <div>
            <div style={styles.brand}>{brand}</div>
            <div style={styles.brandSub}>{subtitle}</div>
          </div>
          {initials && <div style={styles.avatar}>{initials}</div>}
        </div>
      </header>
    )
  }

  return (
    <header style={styles.bar}>
      <button type="button" onClick={handleBack} style={styles.back} aria-label="Voltar">←</button>
      <div style={styles.titleBlock}>
        <div style={styles.title}>{title}</div>
        {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
      </div>
    </header>
  )
}

export default Header
