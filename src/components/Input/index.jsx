import { useState } from 'react'

import { styles } from './styles'

const Input = ({ label, value, onChange, placeholder, type = 'text', required, helperLabel, onHelperClick, helperHref, hint, name }) => {
  const [focused, setFocused] = useState(false)
  const fieldStyle = focused ? { ...styles.field, ...styles.fieldFocus } : styles.field
  return (
    <label style={styles.group}>
      {label && (
        <div style={styles.helperRow}>
          <span style={styles.label}>
            {label}
            {required ? ' *' : ''}
          </span>
          {helperLabel && (
            <a style={styles.helperLink} onClick={onHelperClick} href={helperHref}>
              {helperLabel}
            </a>
          )}
        </div>
      )}
      <input
        name={name}
        type={type}
        value={value ?? ''}
        onChange={(event) => onChange?.(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={fieldStyle}
      />
      {hint && <span style={styles.hint}>{hint}</span>}
    </label>
  )
}

export default Input
