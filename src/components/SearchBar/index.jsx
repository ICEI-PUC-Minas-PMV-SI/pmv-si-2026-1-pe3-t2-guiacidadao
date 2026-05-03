import { styles } from './styles'

const SearchBar = ({ value, onChange, placeholder = 'Buscar...' }) => (
  <div style={styles.wrap}>
    <svg style={styles.icon} viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <input
      style={styles.input}
      value={value ?? ''}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
    />
  </div>
)

export default SearchBar
