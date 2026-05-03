import { styles } from './styles'

const Select = ({ label, value, onChange, options = [], placeholder, required, name }) => (
  <label style={styles.group}>
    {label && (
      <span style={styles.label}>
        {label}
        {required ? ' *' : ''}
      </span>
    )}
    <select
      name={name}
      value={value ?? ''}
      onChange={(event) => onChange?.(event.target.value)}
      style={styles.field}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
)

export default Select
