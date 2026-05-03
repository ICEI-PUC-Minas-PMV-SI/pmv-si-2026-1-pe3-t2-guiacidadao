import { styles } from './styles'

const MenuItem = ({ icon, title, subtitle, onClick }) => (
  <button type="button" onClick={onClick} style={styles.row}>
    <span style={styles.iconBox}>{icon}</span>
    <span style={styles.text}>
      <span style={styles.title}>{title}</span>
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    </span>
    <span style={styles.chevron}>›</span>
  </button>
)

export default MenuItem
