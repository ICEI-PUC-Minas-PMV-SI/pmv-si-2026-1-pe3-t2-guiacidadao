import { styles } from './styles'

const StatCard = ({ value, label, hint }) => (
  <article style={styles.card}>
    <span style={styles.value}>{value}</span>
    <span style={styles.label}>{label}</span>
    {hint && <span style={styles.hint}>{hint}</span>}
  </article>
)

export default StatCard
