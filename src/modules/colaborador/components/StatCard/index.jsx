import { useState } from 'react'

import { styles } from './styles'

const StatCard = ({ value, label, hint, onClick }) => {
  const [hover, setHover] = useState(false)
  const computed = hover ? { ...styles.card, ...styles.cardActive } : styles.card
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={computed}
    >
      <span style={styles.value}>{value}</span>
      <span style={styles.label}>{label}</span>
      {hint && <span style={styles.hint}>{hint}</span>}
    </button>
  )
}

export default StatCard
