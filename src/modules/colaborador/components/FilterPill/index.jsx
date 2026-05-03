import { styles } from './styles'

const FilterPill = ({ active, label, count, onClick }) => (
  <button type="button" onClick={onClick} style={styles.pill(active)}>
    {label}
    {typeof count === 'number' ? ` · ${count}` : ''}
  </button>
)

export default FilterPill
