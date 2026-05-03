import { styles } from './styles'

const Chip = ({ children, variant = 'filled', onRemove, onClick }) => (
  <span style={styles[variant]} onClick={onClick}>
    {children}
    {onRemove && (
      <button type="button" onClick={(event) => { event.stopPropagation(); onRemove() }} style={styles.remove}>
        ×
      </button>
    )}
  </span>
)

export default Chip
