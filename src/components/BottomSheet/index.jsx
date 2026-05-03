import { styles } from './styles'

const BottomSheet = ({ title, onClose, children }) => (
  <>
    <div style={styles.backdrop} onClick={onClose} />
    <section style={styles.sheet}>
      <span style={styles.grabber} />
      <header style={styles.headerRow}>
        <h2 style={styles.title}>{title}</h2>
        <button type="button" onClick={onClose} style={styles.close}>×</button>
      </header>
      <div style={styles.body}>{children}</div>
    </section>
  </>
)

export default BottomSheet
