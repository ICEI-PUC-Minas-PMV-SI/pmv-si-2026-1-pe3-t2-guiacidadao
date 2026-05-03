import { styles } from './styles'

const Button = ({ variant = 'primary', children, disabled, onClick, type = 'button', style }) => {
  const base = styles[variant] || styles.primary
  const computed = disabled ? { ...base, ...styles.disabled } : base
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...computed, ...style }}>
      {children}
    </button>
  )
}

export default Button
