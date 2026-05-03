import { styles } from './styles'

const ImpactBox = ({ title = 'O que muda', items = [] }) => (
  <section style={styles.box}>
    <span style={styles.title}>{title}</span>
    <ul style={styles.list}>
      {items.map((item) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  </section>
)

export default ImpactBox
