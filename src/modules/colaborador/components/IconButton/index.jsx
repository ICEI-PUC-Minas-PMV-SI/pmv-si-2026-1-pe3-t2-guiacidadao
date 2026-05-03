import { styles } from './styles'

const IconButton = ({ children = '+', onClick, ariaLabel }) => (
  <button type="button" onClick={onClick} aria-label={ariaLabel} style={styles.btn}>
    {children}
  </button>
)

export default IconButton
