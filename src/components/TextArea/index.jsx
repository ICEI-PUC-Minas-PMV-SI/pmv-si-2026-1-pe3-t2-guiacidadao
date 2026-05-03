import { useState } from 'react'

import { styles } from './styles'

const TextArea = ({ label, value, onChange, placeholder, required, rows = 4, name }) => {
  const [focused, setFocused] = useState(false)
  const fieldStyle = focused ? { ...styles.field, ...styles.fieldFocus } : styles.field
  return (
    <label style={styles.group}>
      {label && (
        <span style={styles.label}>
          {label}
          {required ? ' *' : ''}
        </span>
      )}
      <textarea
        name={name}
        rows={rows}
        value={value ?? ''}
        onChange={(event) => onChange?.(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={fieldStyle}
      />
    </label>
  )
}

export default TextArea
