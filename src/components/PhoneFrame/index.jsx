import { styles } from './styles'

const PhoneFrame = ({ children }) => (
  <div style={styles.outer}>
    <div style={styles.scroll}>{children}</div>
  </div>
)

export default PhoneFrame
