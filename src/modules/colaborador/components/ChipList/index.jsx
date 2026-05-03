import Chip from '../../../../components/Chip'
import { styles } from './styles'

const ChipList = ({ label, required, items = [], emptyLabel, onAdd, onRemove, addLabel = '+ Adicionar' }) => (
  <section style={styles.group}>
    {label && (
      <header style={styles.labelRow}>
        <span style={styles.label}>{label}{required ? ' *' : ''}</span>
      </header>
    )}
    <div style={styles.chips}>
      {items.length === 0 && emptyLabel && <span style={styles.empty}>{emptyLabel}</span>}
      {items.map((item) => (
        <Chip key={item.id} onRemove={onRemove ? () => onRemove(item.id) : undefined}>
          {item.label}
        </Chip>
      ))}
      {onAdd && (
        <Chip variant="ghost" onClick={onAdd}>
          {addLabel}
        </Chip>
      )}
    </div>
  </section>
)

export default ChipList
