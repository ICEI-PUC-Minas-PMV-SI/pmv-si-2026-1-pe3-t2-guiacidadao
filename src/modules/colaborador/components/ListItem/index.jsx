import { styles } from './styles'

const ListItem = ({ title, subtitle, badge, onClick }) => (
  <button type="button" onClick={onClick} style={styles.row}>
    <span style={styles.text}>
      <span style={styles.title}>{title}</span>
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    </span>
    <span style={styles.rightCol}>
      {badge}
      <span style={{ fontSize: 18, color: '#666' }}>›</span>
    </span>
  </button>
)

export default ListItem
