import { styles } from './styles'

const Badge = ({ variant = 'ativo', children }) => (
  <span style={styles.badge(variant)}>{children}</span>
)

export default Badge
