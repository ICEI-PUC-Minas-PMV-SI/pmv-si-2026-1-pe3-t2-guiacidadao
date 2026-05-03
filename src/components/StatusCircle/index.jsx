import { styles } from './styles'

const glyphs = {
  warning: '!',
  danger: '!',
  success: '✓'
}

const StatusCircle = ({ variant = 'warning' }) => (
  <div style={styles.circle(variant)}>
    <span style={styles.glyph}>{glyphs[variant]}</span>
  </div>
)

export default StatusCircle
