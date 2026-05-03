import BottomNav from '../BottomNav'
import { styles } from './styles'

const ScreenLayout = ({ children, hideNav, padded = true, header }) => (
  <section style={styles.shell}>
    {header}
    <div style={padded ? styles.body : { flex: 1 }}>{children}</div>
    {!hideNav && <BottomNav />}
  </section>
)

export default ScreenLayout
