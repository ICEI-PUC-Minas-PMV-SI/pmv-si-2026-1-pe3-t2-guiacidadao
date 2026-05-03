import { styles } from './styles'

const SectionTitle = ({ children, hint }) => (
  <div style={styles.row}>
    <h2 style={styles.title}>{children}</h2>
    {hint && <span style={styles.hint}>{hint}</span>}
  </div>
)

export default SectionTitle
