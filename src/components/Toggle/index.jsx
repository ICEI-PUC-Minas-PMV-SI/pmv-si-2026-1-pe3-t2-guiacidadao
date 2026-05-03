import { styles } from './styles'

const Toggle = ({ active = false, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={active}
    onClick={() => onChange?.(!active)}
    style={styles.track(active)}
  >
    <span style={styles.thumb(active)} />
  </button>
)

export default Toggle
